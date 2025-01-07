from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.llms import Ollama
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.runnables import RunnablePassthrough

class FootballRAGEngine:
    def __init__(self):
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50
        )
        self.vectorstore = Chroma(
            embedding_function=self.embeddings,
            persist_directory="./data/chroma_db"
        )
        self.llm = Ollama(model="mistral")
        
    def create_retrieval_chain(self):
        template = """Tu es un expert en football. Utilise le contexte suivant pour répondre à la question.
        Si tu ne peux pas répondre à partir du contexte, dis-le clairement.
        
        Contexte: {context}
        
        Question: {question}
        
        Réponse:"""
        
        prompt = ChatPromptTemplate.from_template(template)
        
        retriever = self.vectorstore.as_retriever(
            search_type="similarity",
            search_kwargs={"k": 3}
        )
        
        chain = (
            {"context": retriever, "question": RunnablePassthrough()}
            | prompt
            | self.llm
            | StrOutputParser()
        )
        
        return chain
    
    def add_documents(self, texts, metadata=None):
        docs = self.text_splitter.create_documents(texts, metadatas=metadata)
        self.vectorstore.add_documents(docs) 