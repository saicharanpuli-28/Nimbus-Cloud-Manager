import {
  CloudWatchLogsClient,
  PutLogEventsCommand,
  DescribeLogStreamsCommand,
} from "@aws-sdk/client-cloudwatch-logs";

const client = new CloudWatchLogsClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const LOG_GROUP = "Nimbus-Application-Logs";
const LOG_STREAM = "Backend";

let sequenceToken = null;

async function getSequenceToken() {
  const response = await client.send(
    new DescribeLogStreamsCommand({
      logGroupName: LOG_GROUP,
      logStreamNamePrefix: LOG_STREAM,
    })
  );

  const stream = response.logStreams.find(
    (s) => s.logStreamName === LOG_STREAM
  );

  return stream?.uploadSequenceToken;
}

export async function logToCloudWatch(message) {
  try {
    sequenceToken = await getSequenceToken();

    await client.send(
      new PutLogEventsCommand({
        logGroupName: LOG_GROUP,
        logStreamName: LOG_STREAM,
        logEvents: [
          {
            timestamp: Date.now(),
            message,
          },
        ],
        sequenceToken,
      })
    );

    console.log("✅ CloudWatch Log:", message);
  } catch (err) {
    console.error("CloudWatch Error:", err.message);
  }
}