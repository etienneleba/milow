### Folder structure

The project uses a hexagonal architecture to split the business logic and the implementation details. 

- **domain** : where all the business logic is, the ./src/domain/api/Milow.ts is the entry point of the business logic. The `spi` folder contains all the interfaces of the domain.  
- **infrastructure** : where all the domain interface are implemented and the links with I/O.