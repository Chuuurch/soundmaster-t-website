import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

import { z } from "zod";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ionos.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.SMTP_USER || "bookings@soundmastert.com",
    pass: process.env.SMTP_PASS || "",
  },
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  booking: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Invalid email"),
          date: z.string().optional(),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          await transporter.sendMail({
            from: process.env.SMTP_USER || "bookings@soundmastert.com",
            to: process.env.SMTP_USER || "bookings@soundmastert.com", // Send to themselves for notification
            replyTo: input.email,
            subject: `New Booking Inquiry from ${input.name}`,
            text: `
Name: ${input.name}
Email: ${input.email}
Requested Date: ${input.date || "Not specified"}
Message:
${input.message || "No message provided"}
            `,
          });
          return { success: true };
        } catch (error) {
          console.error("Email send failed:", error);
          throw new Error("Failed to send booking inquiry");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
