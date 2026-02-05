import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

const UNBOUND_CHAT_URL = 'https://api.getunbound.ai/v1/chat/completions';

export interface ChatCompletionOptions {
  model: string;
  prompt: string;
}

@Injectable()
export class LlmService {
  private readonly apiKey: string | undefined;

  constructor() {
    this.apiKey = process.env.UNBOUND_API_KEY;
  }

  async chatCompletion({ model, prompt }: ChatCompletionOptions): Promise<string> {
    if (!this.apiKey?.trim()) {
      throw new HttpException(
        'UNBOUND_API_KEY is not configured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const { data } = await axios.post<{
        choices?: Array<{ message?: { content?: string } }>;
      }>(
        UNBOUND_CHAT_URL,
        {
          model,
          messages: [{ role: 'user' as const, content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 60_000,
        },
      );

      const text =
        data.choices?.[0]?.message?.content?.trim() ??
        '';

      return text;
    } catch (err) {
      if (err instanceof AxiosError) {
        const status = err.response?.status ?? HttpStatus.BAD_GATEWAY;
        const message =
          (err.response?.data as { error?: { message?: string } })?.error
            ?.message ??
          err.message ??
          'Unbound API request failed';
        throw new HttpException(message, status);
      }
      throw new HttpException(
        err instanceof Error ? err.message : 'Unbound API request failed',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
