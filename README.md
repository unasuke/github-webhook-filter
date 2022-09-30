# github-webhook-filter

This is a Cloudflare Worker that filters GitHub push webhook. On received push event wehbook, if push event to default branch, pass it to successor webhook endpoint. Otherwise, ignore it.

## Secret
### `REPO_GROUP`

```json
[
  {
    "repo": "owner/repo1",
    "webhook": "https://example.com/foo-webhook-endpoint"
  },
  {
    "repo": "owner/repo2",
    "webhook": "https://example.com/bar-webhook-endpoint"
  }
]
```
