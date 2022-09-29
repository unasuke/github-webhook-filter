/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
}

const webhookUrl = "https://example.com";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const body = await request.json();
    const defaultBranch = body.repository.default_branch;
    const defaultRef = `refs/heads/${defaultBranch}`;
    console.log(defaultRef);

    if (body.ref !== defaultRef) {
      // Not the default branch
      return new Response("", {
        status: 200,
      });
    } else {
      // If defualt branch
      const resp = await fetch(webhookUrl, {
        method: "POST",
        headers: request.headers,
        body: JSON.stringify(body),
      });
      console.info(await resp.text());
      console.info(await resp.headers);
      return new Response("", { status: 200 });
    }
  },
};
