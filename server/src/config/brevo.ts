const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email'

const sendEmail = async (payload: object) => {
  try {
    const res = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!
      },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      const error = await res.json()
      console.error('Brevo error:', error)
      return
    }
  } catch (err) {
    // Hindi i-crash ang app kahit mag-fail ang email
    console.error('Failed to send email:', err)
  }
}

export const sendRoleAssignmentEmail = async (
  toEmail: string,
  toName: string,
  newRole: string
) => {
  const roleMessages: Record<string, string> = {
    writer: 'You can now create and update blog articles.',
    admin: 'You now have access to user management and article management.',
  }

  const payload =

    await sendEmail({
      to: [{ email: toEmail, name: toName }],
      sender: {
        email: process.env.BREVO_SENDER_EMAIL!,
        name: process.env.BREVO_SENDER_NAME
      },
      subject: `🎉 Your role has been updated — TripplesPH`,
      htmlContent: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Role Update Notification</h2>
        <p>Hi <strong>${toName}</strong>,</p>
        <p>Your account role has been updated to <strong>${newRole.toUpperCase()}</strong>.</p>
        <p>${roleMessages[newRole] ?? 'Your access has been updated.'}</p>
        <p>You can now log in to 
          <a href="${process.env.CLIENT_URL}">TripplesPH</a> 
          to access your dashboard.
        </p>
        <hr style="border: none; border-top: 1px solid #eee;" />
        <p style="color: gray; font-size: 12px;">
          This is an automated notification. Please do not reply.
        </p>
      </div>
    `
    })
}

// ── Article rejected — notify writer ──────────────
export const sendArticleRejectedEmail = async (
  toEmail: string,
  toName: string,
  articleTitle: string,
  reason: string
) => {
  await sendEmail({
    to: [{ email: toEmail, name: toName }],
    sender: { email: process.env.BREVO_SENDER_EMAIL!, 
    name:  process.env.BREVO_SENDER_NAME
    },
    subject: `❌ Your article needs revision — TripplesPH`,
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2>Article Revision Required</h2>
        <p>Hi <strong>${toName}</strong>,</p>
        <p>Your article <strong>"${articleTitle}"</strong> has been reviewed and needs revision.</p>
        <div style="background:#f8d7da;padding:15px;border-radius:6px;margin:15px 0;">
          <strong>Reason:</strong>
          <p style="margin:5px 0 0;">${reason}</p>
        </div>
        <p>Please update your article and resubmit for approval.</p>
        <a href="${process.env.CLIENT_URL}/writer" style="background:#dc3545;color:white;padding:10px 20px;border-radius:5px;text-decoration:none;">
          Go to My Articles
        </a>
        <p style="color:gray;font-size:12px;margin-top:20px;">This is an automated notification.</p>
      </div>
    `
  })
}

// ── Article approved only — notify writer ─────────
export const sendArticleApprovedEmail = async (
  toEmail: string,
  toName: string,
  articleTitle: string
) => {
  await sendEmail({
    to: [{ email: toEmail, name: toName }],
    sender: { email: process.env.BREVO_SENDER_EMAIL!, name: 'TripplesPH' },
    subject: `✅ Your article has been approved — TripplesPH`,
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2>Article Approved!</h2>
        <p>Hi <strong>${toName}</strong>,</p>
        <p>Great news! Your article <strong>"${articleTitle}"</strong> has been approved.</p>
        <p>You can now publish it by selecting <strong>"Publish Now"</strong> from the status dropdown.</p>
        <a href="${process.env.CLIENT_URL}/writer" style="background:#28a745;color:white;padding:10px 20px;border-radius:5px;text-decoration:none;">
          Go to My Articles
        </a>
        <p style="color:gray;font-size:12px;margin-top:20px;">This is an automated notification.</p>
      </div>
    `
  })
}

// ── Article rejected — notify writer ──────────────
export const sendArticleApprovedAndPublishedEmail = async (
  toEmail: string,
  toName: string,
  articleTitle: string,
  articleId: string
) => {
  await sendEmail({
    to: [{ email: toEmail, name: toName }],
    sender: { email: process.env.BREVO_SENDER_EMAIL!, name: 'TripplesPH' },
    subject: `🚀 Your article is now live — TripplesPH`,
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2>Your Article is Live!</h2>
        <p>Hi <strong>${toName}</strong>,</p>
        <p>Your article <strong>"${articleTitle}"</strong> has been approved and published by our team.</p>
        <p>It is now visible to all readers.</p>
        <a href="${process.env.CLIENT_URL}/articles/${articleId}" style="background:#007bff;color:white;padding:10px 20px;border-radius:5px;text-decoration:none;">
          View Article
        </a>
        <p style="color:gray;font-size:12px;margin-top:20px;">This is an automated notification.</p>
      </div>
    `
  })
}