# Toduezy
A todo app focused on the idea of tracking tasks based on the person or team to whom the task is owed.
I currently use Microsoft One Note for this but would like something with a more specific feature set.

# Roadmap
Multi user auth
time estimates
contact importance value
recommendation system

# Tech
Frontend:
    React/Typescript using Chakra theming framework
    
Backend:
    Node/Typescript
    Express
    Passport
    AWS RDS
    
# Docker for local dynamodb

 docker run -d -p 8000:8000 --name local-dynamodb -e AWS_ACCESS_KEY_ID=LOCAL -e AWS_SECRET_ACCESS_KEY=local amazon/dynamodb-local
    
