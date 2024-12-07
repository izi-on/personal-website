import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";

export async function compareSentences(sentence1: string, sentence2: string) {
  const model = await use.load();
  const embeddings = await model.embed([sentence1, sentence2]);

  const similarity = tf.matMul(
    embeddings.slice([0, 0], [1]),
    embeddings.slice([1, 0], [1]),
    false,
    true,
  );

  return similarity.dataSync()[0];
}

export const getMostSimilar = async (
  sentence: string,
  sentences: string[],
): Promise<{ canonicalTitle: string; similarity: number }> => {
  const similarities = await Promise.all(
    sentences.map(
      async (s): Promise<[number, string]> => [
        await compareSentences(sentence, s),
        s,
      ],
    ),
  );

  return {
    canonicalTitle: similarities.sort((a, b) => a[0] - b[0])[0][1],
    similarity: similarities.sort((a, b) => a[0] - b[0])[0][0],
  };
};
