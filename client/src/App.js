import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery } from '@apollo/client';
import { DisplayData } from './components/DisplayData';
import { DisplayFeed } from './components/DisplayFeed';

function App() {
    const client = new ApolloClient({
        cache: new InMemoryCache(),

        // ___ADD TO ENV___
        uri: 'http://localhost:4000/graphql',
    });

    return (
        <ApolloProvider client={client}>
            <div className="App">
                <DisplayFeed />
                <DisplayData />
            </div>
        </ApolloProvider>
    );
}

export default App;
