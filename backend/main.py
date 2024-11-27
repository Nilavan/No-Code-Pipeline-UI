from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: list
    edges: list

def check_dag(nodes, edges):
    adjacency_list = {node['id']: [] for node in nodes}
    for edge in edges:
        adjacency_list[edge['source']].append(edge['target'])

    def has_cycle(node, visited, recursion_stack):
        visited.add(node)
        recursion_stack.add(node)

        for neighbor in adjacency_list.get(node, []):
            if neighbor not in visited:
                if has_cycle(neighbor, visited, recursion_stack):
                    return True
            elif neighbor in recursion_stack:
                return True 

        recursion_stack.remove(node)
        return False

    visited = set()
    for node in adjacency_list:
        if node not in visited:
            if has_cycle(node, visited, set()): 
                return False

    return True

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    nodes = pipeline.nodes
    edges = pipeline.edges

    is_dag = check_dag(nodes, edges)

    return {
        'num_nodes': len(nodes),
        'num_edges': len(edges),
        'is_dag': is_dag
    }
