import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Explicit click/acceptance required. Never trust a model's self-issued boot
 * report or install into a third-party model from this client action.
 */
export const prepareRemoteCoreFn = createServerFn({ method: "POST" })
  .validator(z.object({
    accepted: z.literal(true),
    persona: z.enum(["angelica", "emilia", "luna"]),
  }).strict())
  .handler(async ({ data }) => {
    const { prepareRemoteOffer } = await import("./remote-opt-in.mjs");
    return prepareRemoteOffer({ accepted: data.accepted, persona: data.persona });
  });
