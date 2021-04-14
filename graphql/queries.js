import { gql } from '@apollo/client';

const GET_ALL_JOBS = gql`
    query Jobs {
        jobs {
          id
          title
          location
          company
          language
        }
    }`;

export { GET_ALL_JOBS };
