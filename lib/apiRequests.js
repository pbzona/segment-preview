import axios from 'axios';

const projectKey = 'segment-view';
const environmentKey = 'test';

const getConfig = () => {
  return {
    headers: {
      'Authorization': process.env.LD_API_KEY,
      'Content-Type': 'application/json; domain-model=launchdarkly.semanticpatch'
    }
  }
}

export const getAllSegments = async () => {
  const { data } = await axios.get(
    `https://app.launchdarkly.com/api/v2/segments/${projectKey}/${environmentKey}`,
    getConfig()
  );

  return data.items;
}

export const addUserToSegment = async segmentKey => {
  return await axios.patch(
    `https://app.launchdarkly.com/api/v2/segments/${projectKey}/${environmentKey}/${segmentKey}`,
    {
      comment: 'Add temporary user to segment for evaluation',
      environmentKey,
      instructions: [
        { 
          kind: 'addIncludedUsers',
          values: [ `testuser-${segmentKey}` ]
        }
      ]
    },
    getConfig()
  );
}

export const removeUserFromSegment = async segmentKey => {
  return await axios.patch(
    `https://app.launchdarkly.com/api/v2/segments/${projectKey}/${environmentKey}/${segmentKey}`,
    {
      comment: 'Clean up temporary user',
      environmentKey,
      instructions: [
        { 
          kind: 'removeIncludedUsers',
          values: [ `testuser-${segmentKey}` ]
        }
      ]
    },
    getConfig()
  );
}
