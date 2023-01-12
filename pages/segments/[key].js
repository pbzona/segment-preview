import React from 'react';
import LaunchDarkly from 'launchdarkly-node-server-sdk';
import { addUserToSegment, removeUserFromSegment } from '../../lib/apiRequests';

const SingleSegment = ({ segmentKey, flagValues }) => {
  return (
    <main className='max-w-lg m-auto'>
      <h1 className='text-4xl text-blue-400 my-8'>{ segmentKey }</h1>
      { Object.keys(flagValues).map(flag => {
        if (flag !== '$flagsState' && flag !== '$valid') {
          return (
            <div key={flag} className='text-xl mb-4'>
              <p>
                <strong className='text-emerald-500'>{`${flag}: `}</strong>
                { flagValues[flag].toString() }
              </p>
            </div>
          )
        }
      })}
    </main>
  )
}

export async function getServerSideProps(context) {
  const segmentKey = context.params.key;

  const client = LaunchDarkly.init(process.env.LD_SDK_KEY);
  await client.waitForInitialization();
  
  let flagValues;
  // Add a temporary test user for evaluation
  addUserToSegment(segmentKey)
    .then(async () => {
      // Get all flag values for that user
      flagValues = await client.allFlagsState({ key: `testuser-${segmentKey}` });
    });

    // Clean up the temporary user
  await removeUserFromSegment(segmentKey);
    
  return {
    props: { segmentKey, flagValues: flagValues.toJSON() }
  }
}

export default SingleSegment;