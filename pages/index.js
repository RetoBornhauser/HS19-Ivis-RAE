import Layout from '../components/Layout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import data from '../data/players.json'

const Index = props => (
  <Layout>
    <h1>Relative Age Effect in the youth academy of FC Basel</h1>
    <ul>
      {props.shows.map(show => (
        <li key={show.id}>
          <Link href="/p/[id]" as={`/p/${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

Index.getInitialProps = async function() {
  const res = require('../data/players.json')
  console.log(res)
  console.log(`Show data fetched. Count: ${res.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
};

export default Index;