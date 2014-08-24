Travellers map proof of concept
===============================

[![Media Suite](http://mediasuite.co.nz/ms-badge.png)](http://mediasuite.co.nz)

## Design goals

- decoupled architecture 
- ability to add data sources and tweak algorithm without any code rewrite
- performant enough to be able to handle lots of road data and return relevant results in a timely manor
- ability to push data at a client as changes happen to various data sources

### decoupled architecture
Use seneca framework to write small microservices

### add data services
Use adapters and a config file to load new data sources on the fly and config values to tweak weighting of various 
data sources on the fly

### performant enough (tm) + push to client
Accept large set of nodes via a post from front end as geojson, break it apart into separate roading segments and submit each against a service that returns a value from 0-10 indicating how badly impacted that section of road is. Build up a
collection of results and send back to the client when ready. Set up SSE to push any subsequent node changes to the client
as they happen

## Unsolved challenges

- Probably performance bottleneck. If we have to calculate all the nodes city wide all at once thats a tonne of data coming from the client which is bad and its a tonne of data to process in one go which could be slow and its a tonne of data to send back to the client in the form of a collection which is also bad... oh my!
