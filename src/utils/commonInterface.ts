import { MessageParam } from "@anthropic-ai/sdk/resources";
import { Access, Gender, Libido } from "@prisma/client";
import { Request, Response } from "express";
import { number } from "joi";

export type TResponse = {
  code: number;
  data: TGenResObj;
};

export type TGenResObj = {
  success: boolean;
  message: string;
  data?: any;
};

export type TEventType = "user.created" | "user.updated" | "user.deleted";

export type Event = {
  data: Record<string, string | number>;
  object: "event";
  type: TEventType;
};

export type TPaginationObj = {
  page: string;
  pageSize: string;
};

export type TAiconsentObj = {
  context: MessageParam[];
  history: string;
};

export type IcharacterAndVariants = {
  characterInfo: {
    name: string;
    shortMessage: string;
    gender: Gender;
    NSFW: boolean;
    accessableTo: Access;
    createdby: string;
  };
  variants: {
    default: boolean;
    firstMessage: string;
    personality: string;
    description: string;
    avatar: string;
    characterIcon?: string;
    libido: Libido;
  }[];
}[];

export type IMsgObj = {
  type: string;
  userAssistandMSGId: any;
  context: any;
  matchedEntries: any;
  modelInfo: AIModelObj;
  userMessage: string;
  messageId: string;
  characterId: string;
  userInfo: IUserInfo;
  parentId?: string; // is passed from frontend but not used?
  isContextLimitExceed: boolean;
  continueConversationId: string;
  systemPrompt: string;
  totalUsedTokens: number;
  res: Response;
  req: Request;
};

export type IUserInfo = {
  userId: string;
  userName: string;
  avatar?: string;
  description?: string;
};

export type AIModelObj = {
  verbose?: string;
  modelId: string;
  id: string;
  modelName: string;
  modelIcon: string;
  maxTokens: number;
  temperature: number;
  topP: number;
  topK: number;
  frequencyPenalty: number;
  presencePenalty: number;
  repetitionPenalty: number;
  isDefault: boolean;
};

export type TokensCount = {
  inputTokenCount: number;
  outputTokenCount: number;
};

export type ChubAICharacters = {
  count: number;
  nodes: Node[];
  page: number;
};

type Node = {
  avatar_url: string;
  bound_preset: number;
  createdAt: string;
  creatorId: number;
  definition: string;
  description: string;
  forks: number[];
  forksCount: number;
  fullPath: string;
  hasGallery: boolean;
  id: number;
  is_favorite: boolean;
  is_public: boolean;
  is_unlisted: boolean;
  labels: Label[];
  lastActivityAt: string;
  nChats: number;
  nMessages: number;
  nTokens: number;
  n_favorites: number;
  n_public_chats: number;
  name: string;
  nsfw_image: boolean;
  permissions: string;
  primaryFormat: string;
  projectSpace: string;
  rating: number;
  ratingCount: number;
  ratings_disabled: boolean;
  recommended: boolean;
  related_characters: number[];
  related_extensions: number[];
  related_lorebooks: number[];
  related_prompts: number[];
  starCount: number;
  tagline: string;
  topics: string[];
  verified: boolean;
};

type Label = {
  description: string;
  title: string;
};

export type SearchConfig = {
  search: string;
  name_like?: string;
  first: number;
  min_users_chatted: number;
  tags: string;
  exclude_tags: string;
  page: number;
  sort:
    | "download_count"
    | "id"
    | "rating"
    | "default"
    | "rating_count"
    | "last_activity_at"
    | "trending_downloads"
    | "n_favorites"
    | "created_at"
    | "star_count"
    | "msgs_chat"
    | "msgs_user"
    | "chats_user"
    | "name"
    | "n_tokens"
    | "random"
    | "trending"
    | "newcomer"
    | "favorite_time";
  asc: boolean;
  include_forks: boolean;
  nsfw: boolean;
  nsfl: boolean;
  nsfw_only: boolean;
  require_images: boolean;
  require_example_dialogues: boolean;
  require_alternate_greetings: boolean;
  require_custom_prompt: boolean;
  max_days_ago?: number;
  exclude_mine: boolean;
  only_mine?: boolean;
  venus: boolean;
  chub: boolean;
  min_tokens?: number;
  max_tokens?: number;
  require_expressions: boolean;
  require_lore: boolean;
  mine_first: boolean;
  require_lore_embedded: boolean;
  require_lore_linked: boolean;
  my_favorites: boolean;
  topics: string;
  excludetopics: string;
  special_mode?: string;
  creator_id?: number;
  namespace?: string;
  username?: string;
  inclusive_or: boolean;
  recommended_verified: boolean;
  min_tags?: number;
};

type Optional<T> = {
  [P in keyof T]?: T[P] extends object ? Optional<T[P]> : T[P];
};

export type OptionalSearchConfig = Optional<SearchConfig>;

const sort = [
  "download_count",
  "id",
  "rating",
  "default",
  "rating_count",
  "last_activity_at",
  "trending_downloads",
  "n_favorites",
  "created_at",
  "star_count",
  "msgs_chat",
  "msgs_user",
  "chats_user",
  "name",
  "n_tokens",
  "random",
  "trending",
  "newcomer",
  "favorite_time",
] as const;

export type IPicInfo = {
  content: string | null;
  s3Url: string | null;
};
