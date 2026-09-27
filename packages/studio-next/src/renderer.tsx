
import type { CSSProperties, ReactNode } from "react";
import type { StudioCommerceProduct, StudioRenderContext, StudioSection } from "./types";
import { assertStudioDocument, resolveTheme } from "./validate";

function text(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

async function ProductShelf({ section, context }: { section: StudioSection; context: StudioRenderContext }) {
  const items = await context.adapter.commerce.products({ shelf: text(section.settings.shelf), limit: Number(section.settings.limit ?? 12) });
  return <div className="studio-products">{items.map((product: StudioCommerceProduct) => <article className="studio-product" key={product.id}><div className="studio-product__media">{product.image ? <img src={product.image} alt="" /> : null}{product.badge ? <span>{product.badge}</span> : null}</div><h3>{product.title}</h3><p>{product.price}</p></article>)}</div>;
}

async function Section({ section, context }: { section: StudioSection; context: StudioRenderContext }): Promise<ReactNode> {
  if (section.disabled) return null;
  const heading = text(section.settings.heading, text(section.settings.title));
  const body = text(section.settings.body, text(section.settings.description));
  const style = { "--studio-section-gap": `${Number(section.settings.gap ?? 24)}px` } as CSSProperties;
  if (["featured-collection", "product-grid", "product-carousel", "featured-product", "recommendations", "recently-viewed"].includes(section.type)) {
    return <section className={`studio-section studio-section--${section.type}`} data-section-id={section.id} style={style}>{heading ? <h2>{heading}</h2> : null}<ProductShelf section={section} context={context} /></section>;
  }
  if (["hero-banner", "image-banner", "image-with-text", "promo-banner"].includes(section.type)) {
    const image = text(section.settings.image);
    return <section className={`studio-section studio-hero studio-section--${section.type}`} data-section-id={section.id} style={image ? { ...style, backgroundImage: `url(${image})` } : style}><div>{heading ? <h1>{heading}</h1> : null}{body ? <p>{body}</p> : null}{text(section.settings.buttonLabel) ? <a href={text(section.settings.buttonUrl, "#")}>{text(section.settings.buttonLabel)}</a> : null}</div></section>;
  }
  if (section.type === "faq" || section.type === "accordion") {
    return <section className={`studio-section studio-section--${section.type}`} data-section-id={section.id} style={style}>{heading ? <h2>{heading}</h2> : null}<div className="studio-accordion">{section.blocks.map((block) => <details key={block.id}><summary>{text(block.data.question, text(block.data.title, "Question"))}</summary><p>{text(block.data.answer, text(block.data.body))}</p></details>)}</div></section>;
  }
  if (section.type === "slideshow") {
    return <section className="studio-section studio-slideshow" data-autoplay={String(section.settings.autoplaySeconds ?? 5)} data-section-id={section.id}>{section.blocks.map((block) => <article key={block.id}><h2>{text(block.data.heading, heading)}</h2><p>{text(block.data.body, body)}</p></article>)}</section>;
  }
  if (section.type === "spacer") return <div aria-hidden="true" className="studio-spacer" style={{ height: Number(section.settings.height ?? 32) }} />;
  if (section.type === "divider") return <hr className="studio-divider" />;
  return <section className={`studio-section studio-section--${section.type}`} data-section-id={section.id} style={style}>{heading ? <h2>{heading}</h2> : null}{body ? <p>{body}</p> : null}{section.blocks.length ? <div className="studio-blocks">{section.blocks.map((block) => <article key={block.id}><h3>{text(block.data.title)}</h3><p>{text(block.data.body)}</p></article>)}</div> : null}</section>;
}

export async function StudioRenderer(context: StudioRenderContext) {
  const document = assertStudioDocument(context.document);
  const theme = resolveTheme(document.theme);
  return <div className={`studio-theme studio-theme--${theme}`} data-studio-site={document.siteId} data-studio-surface={document.surfaceKey}>{await Promise.all(document.sections.map((section) => <Section context={{ ...context, document }} key={section.id} section={section} />))}</div>;
}
