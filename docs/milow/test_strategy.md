### Test strategy

- **Functional** : This test is really wide it encapsulates the whole project. To avoid calling the real API during the test, I use a record and replay decorator around the model. 
- **integration** : These tests test the secondary adapters of the project