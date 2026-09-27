
export const STUDIO_SECTION_TYPES = ["announcement-bar", "header", "hero-banner", "slideshow", "image-banner", "image-with-text", "rich-text", "featured-collection", "product-grid", "product-carousel", "featured-product", "collection-list", "category-grid", "brand-grid", "logo-list", "promo-grid", "promo-banner", "countdown", "newsletter", "testimonials", "reviews", "faq", "blog-posts", "video", "gallery", "lookbook", "shoppable-image", "tabs", "accordion", "spacer", "divider", "custom-html", "contact-form", "search", "breadcrumbs", "recently-viewed", "recommendations", "cart-summary", "trust-badges", "footer"] as const;
export type StudioSectionType = (typeof STUDIO_SECTION_TYPES)[number];
export type StudioThemeId = "lavishta" | "essential" | "electronics";
export type StudioSurfaceTemplate = "home" | "product" | "products" | "category" | "collection" | "cart";
export type StudioSurfaceKind = "template" | "landing-page" | "group";

export interface StudioBlock {
  id: string;
  type: string;
  data: Record<string, unknown>;
}

export interface StudioSection {
  id: string;
  type: StudioSectionType;
  disabled?: boolean;
  settings: Record<string, unknown>;
  blocks: StudioBlock[];
}

export interface StudioDocument {
  id: string;
  tenantKey?: never;
  siteId: string;
  surfaceKey: string;
  surfaceKind: StudioSurfaceKind;
  template?: StudioSurfaceTemplate;
  version: number;
  theme: StudioThemeId;
  sections: StudioSection[];
  metadata?: Record<string, unknown>;
  publishedAt?: string | null;
}

export interface StudioCommerceProduct {
  id: string;
  slug: string;
  title: string;
  price: string;
  compareAtPrice?: string | null;
  image?: string | null;
  badge?: string | null;
}

export interface StudioCommerceAdapter {
  products(input: { shelf?: string; limit?: number }): Promise<StudioCommerceProduct[]>;
  product?(slug: string): Promise<StudioCommerceProduct | null>;
  cart?(): Promise<unknown>;
}

export interface StudioDeliveryAdapter {
  getPublishedDocument(input: { site: string; surface: string; previewToken?: string }): Promise<StudioDocument | null>;
  getPublishedContent?<T = Record<string, unknown>>(input: { site: string; kind: string; slug?: string }): Promise<T | T[] | null>;
  commerce: StudioCommerceAdapter;
}

export interface StudioRenderContext {
  adapter: StudioDeliveryAdapter;
  document: StudioDocument;
  pathname?: string;
}
