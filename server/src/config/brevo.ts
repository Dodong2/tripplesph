const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email'

export const sendRoleAssignmentEmail = async (
  toEmail: string,
  toName: string,
  newRole: string
) => {
  const roleMessages: Record<string, string> = {
    writer: 'You can now create and update blog articles.',
    admin: 'You now have access to user management and article management.',
  }

  const payload = {
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
  }

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