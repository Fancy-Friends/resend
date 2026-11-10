# Setting up Resend

Generated from `provider/manifest.json`; do not edit. Each step cites the provider page it
came from. Words in **bold** are values from YOUR app, filled in where a host shows these steps.

## 1. Set up a receiving domain for **your app's name**

Resend receives mail for ANY address at a verified domain, so one domain serves every account: give each its own local part. Use a SUBDOMAIN if the root domain already handles mail. On the Domains page, copy the MX record value shown for the domain (it differs by region) into your DNS, then confirm it. Resend's MX record must be the LOWEST priority value on that domain, or mail does not reach Resend.

Source: [resend.com](https://resend.com/docs/dashboard/receiving/custom-domains)

## 2. Create a Full access API key

Sending access "can only send emails", and the email_received trigger READS every message (email_get) and its attachments, so this connector needs Full access. The key's value cannot be viewed again after it is created, so store it straight away.

**Copy:**

- Key name: **your app's name** (**this connector's name**)

**Yields:** `apiKey`

Source: [resend.com](https://resend.com/docs/api-reference/api-keys/create-api-key)

## 3. Point a webhook at **your app's name**

On the Webhooks page, Add Webhook: the endpoint is **your host's webhook URL for this connector**, and the event is email.received. Copy the webhook's signing secret exactly as shown, whsec_ prefix included; every delivery is refused until it is set.

**Copy:**

- Endpoint URL: **your host's webhook URL for this connector**

**Yields:** `webhookSecret`

Source: [resend.com](https://resend.com/docs/webhooks/create-webhook)

## 4. Send a test message to an account's address — an AGENT step

Send one email to an address on the receiving domain that belongs to an account, and check it arrives routed to that account.

**The agent is asked:**

> Send one email to an address on **your app's name**'s receiving domain that belongs to a known account. Confirm **your app's name** received an email_received delivery for **this connector's name**, that its signature verified, and that its recipient route matched that account. Report the email_id, the route key that matched, and the subject that email_get returned.

**Done when:** The delivery verified, routed to the account that owns the address, and email_get returned the message you sent.

Source: [resend.com](https://resend.com/docs/dashboard/receiving/introduction)
