import {StoryblokStory} from 'storyblok-generate-ts'

export interface AccordionStoryblok {
  spacing?: "" | "auto" | "none" | "xs" | "sm" | "md" | "lg" | "xl";
  headingOrder?: string;
  anchor?: string;
  headline?: string;
  items?: AccordionItemStoryblok[];
  _uid: string;
  component: "Accordion";
  [k: string]: any;
}

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface AccordionItemStoryblok {
  headline?: string;
  text?: RichtextStoryblok;
  anchor?: string;
  _uid: string;
  component: "AccordionItem";
  [k: string]: any;
}

export interface AnchorNavigationStoryblok {
  title?: string;
  _uid: string;
  component: "AnchorNavigation";
  [k: string]: any;
}

export interface CallToActionStoryblok {
  centerButton?: boolean;
  spacing?: "" | "auto" | "none" | "xs" | "sm" | "md" | "lg" | "xl";
  anchor?: string;
  links?: LinkStoryblok[];
  _uid: string;
  component: "CallToAction";
  [k: string]: any;
}

export type MultilinkStoryblok =
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "story";
      target?: "_self" | "_blank";
      story?: {
        name: string;
        created_at?: string;
        published_at?: string;
        id: number;
        uuid: string;
        content?: {
          [k: string]: any;
        };
        slug: string;
        full_slug: string;
        sort_by_date?: null | string;
        position?: number;
        tag_list?: string[];
        is_startpage?: boolean;
        parent_id?: null | number;
        meta_data?: null | {
          [k: string]: any;
        };
        group_id?: string;
        first_published_at?: string;
        release_id?: null | number;
        lang?: string;
        path?: null | string;
        alternates?: any[];
        default_full_slug?: null | string;
        translated_slugs?: null | any[];
        [k: string]: any;
      };
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "asset" | "url";
      target?: "_self" | "_blank";
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: "email";
      target?: "_self" | "_blank";
      [k: string]: any;
    };

export interface ConfigurationStoryblok {
  footerCtaText?: string;
  footerCtaLink?: LinkStoryblok[];
  directories?: NavigationGroupStoryblok[];
  socialLinks?: SocialLinkStoryblok[];
  legalLinks?: NavigationStoryblok[];
  metaLinks?: NavigationStoryblok[];
  homePage: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  address?: RichtextStoryblok;
  contact?: RichtextStoryblok;
  openingHours?: RichtextStoryblok;
  copyright?: string;
  primaryNavigation?: NavigationStoryblok[];
  secondaryNavigation?: NavigationStoryblok[];
  showContactButton?: boolean;
  contactButtonLabel: string;
  languages: string[];
  seo?: {
    _uid?: string;
    title?: string;
    plugin?: string;
    og_image?: string;
    og_title?: string;
    description?: string;
    twitter_image?: string;
    twitter_title?: string;
    og_description?: string;
    twitter_description?: string;
    [k: string]: any;
  };
  _uid: string;
  component: "Configuration";
  [k: string]: any;
}

export interface ContactFormPresetStoryblok {
  referrer?: number | string;
  audience?: number | string;
  appointmentChecked?: boolean;
  _uid: string;
  component: "ContactFormPreset";
  [k: string]: any;
}

export interface AssetStoryblok {
  _uid?: string;
  id: number;
  alt?: string;
  name: string;
  focus?: string;
  source?: string;
  title?: string;
  filename: string;
  copyright?: string;
  fieldtype?: string;
  meta_data?: null | {
    [k: string]: any;
  };
  is_external_url?: boolean;
  [k: string]: any;
}

export interface ContactPersonStoryblok {
  image?: AssetStoryblok;
  headline?: string;
  text?: RichtextStoryblok;
  links?: LinkStoryblok[];
  headingOrder?: string;
  anchor?: string;
  _uid: string;
  component: "ContactPerson";
  [k: string]: any;
}

export interface EntryCarouselStoryblok {
  headline?: string;
  numItems: string;
  links?: LinkStoryblok[];
  headingOrder?: string;
  anchor?: string;
  _uid: string;
  component: "EntryCarousel";
  [k: string]: any;
}

export interface EntryListStoryblok {
  _uid: string;
  component: "EntryList";
  [k: string]: any;
}

export interface HeadlineCardStoryblok {
  headline?: string;
  links?: LinkStoryblok[];
  _uid: string;
  component: "HeadlineCard";
  [k: string]: any;
}

export interface HomePageHeroStoryblok {
  items?: HomePageHeroItemStoryblok[];
  _uid: string;
  component: "HomePageHero";
  [k: string]: any;
}

export interface HomePageHeroItemStoryblok {
  title?: string;
  links?: LinkStoryblok[];
  image?: AssetStoryblok;
  video?: AssetStoryblok;
  videoPoster?: AssetStoryblok;
  imageLeft?: boolean;
  _uid: string;
  component: "HomePageHeroItem";
  [k: string]: any;
}

export interface ImageStoryblok {
  asset?: AssetStoryblok;
  caption?: RichtextStoryblok;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  _uid: string;
  component: "Image";
  [k: string]: any;
}

export interface ImageAspectRatioStoryblok {
  asset?: AssetStoryblok;
  aspectRatio?: "" | "3/4" | "1/1" | "16/9";
  _uid: string;
  component: "ImageAspectRatio";
  [k: string]: any;
}

export interface ImageCarouselStoryblok {
  aspectRatio?: "" | "3/4" | "1/1" | "16/9";
  spacing?: "" | "auto" | "none" | "xs" | "sm" | "md" | "lg" | "xl";
  headingOrder?: string;
  anchor?: string;
  headline?: string;
  items?: (TextCardStoryblok | ImageStoryblok)[];
  links?: LinkStoryblok[];
  _uid: string;
  component: "ImageCarousel";
  [k: string]: any;
}

export type MultiassetStoryblok = {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  [k: string]: any;
}[];

export interface ImageDoubleStoryblok {
  withGap?: boolean;
  imageAspectRatio?: "" | "3/4" | "1/1" | "16/9";
  containerWidth?: "" | "content" | "full";
  spacing?: "" | "auto" | "none" | "xs" | "sm" | "md" | "lg" | "xl";
  anchor?: string;
  images: MultiassetStoryblok;
  caption?: string;
  captionFirst?: string;
  _uid: string;
  component: "ImageDouble";
  [k: string]: any;
}

export interface ImageSingleStoryblok {
  containerWidth?: "" | "content" | "wide" | "full";
  imageSize?: "" | "sm" | "md" | "lg";
  spacing?: "" | "auto" | "none" | "xs" | "sm" | "md" | "lg" | "xl";
  anchor?: string;
  image?: AssetStoryblok;
  caption?: string;
  _uid: string;
  component: "ImageSingle";
  [k: string]: any;
}

export interface ImageTeaserStoryblok {
  containerWidth?: "" | "content" | "full";
  textWidth?: "" | "1/2" | "1/3";
  imageSize?: "" | "sm" | "md" | "lg";
  imageLeft?: boolean;
  spacing?: "" | "auto" | "none" | "xs" | "sm" | "md" | "lg" | "xl";
  headlineOrder: string;
  anchor?: string;
  image?: AssetStoryblok;
  headline?: string;
  text?: string;
  links?: LinkStoryblok[];
  caption?: string;
  _uid: string;
  component: "ImageTeaser";
  [k: string]: any;
}

export interface ItemListStoryblok {
  spacing?: "" | "auto" | "none" | "xs" | "sm" | "md" | "lg" | "xl";
  headingOrder?: string;
  anchor?: string;
  items?: ItemListItemStoryblok[];
  _uid: string;
  component: "ItemList";
  [k: string]: any;
}

export interface ItemListItemStoryblok {
  headline?: string;
  text?: RichtextStoryblok;
  _uid: string;
  component: "ItemListItem";
  [k: string]: any;
}

export interface JobPostingStoryblok {
  title: string;
  description?: RichtextStoryblok;
  image?: AssetStoryblok;
  tags?: (number | string)[];
  sites: (StoryblokStory<ConfigStoryblok> | string)[];
  body?: (
    | AccordionStoryblok
    | AnchorNavigationStoryblok
    | CallToActionStoryblok
    | ContactPersonStoryblok
    | EntryCarouselStoryblok
    | EntryListStoryblok
    | HomePageHeroStoryblok
    | ImageCarouselStoryblok
    | ImageDoubleStoryblok
    | ImageSingleStoryblok
    | ImageTeaserStoryblok
    | ItemListStoryblok
    | JobPostingListStoryblok
    | LatestProjectsCarouselStoryblok
    | LinkListStoryblok
    | MediaGridStoryblok
    | MediaQuartetStoryblok
    | NewsCarouselStoryblok
    | PageHeroStoryblok
    | ProjectCarouselStoryblok
    | StatsStoryblok
    | TestImageStoryblok
    | TextBlockStoryblok
    | TextCarouselStoryblok
    | TextImageStoryblok
    | VideoStoryblok
  )[];
  seo?: {
    _uid?: string;
    title?: string;
    plugin?: string;
    og_image?: string;
    og_title?: string;
    description?: string;
    twitter_image?: string;
    twitter_title?: string;
    og_description?: string;
    twitter_description?: string;
    [k: string]: any;
  };
  listTitle?: string;
  listDescription?: string;
  cover?: AssetStoryblok;
  _uid: string;
  component: "JobPosting";
  [k: string]: any;
}

export interface JobPostingListStoryblok {
  headline?: string;
  headingOrder?: string;
  anchor?: string;
  _uid: string;
  component: "JobPostingList";
  [k: string]: any;
}

export interface KnowledgeBaseArticleStoryblok {
  title: string;
  description?: string;
  image?: AssetStoryblok;
  tags?: (number | string)[];
  sites: (StoryblokStory<ConfigStoryblok> | string)[];
  body?: (
    | AccordionStoryblok
    | AnchorNavigationStoryblok
    | CallToActionStoryblok
    | ContactPersonStoryblok
    | EntryCarouselStoryblok
    | EntryListStoryblok
    | HomePageHeroStoryblok
    | ImageCarouselStoryblok
    | ImageDoubleStoryblok
    | ImageSingleStoryblok
    | ImageTeaserStoryblok
    | ItemListStoryblok
    | JobPostingListStoryblok
    | LatestProjectsCarouselStoryblok
    | LinkListStoryblok
    | MediaGridStoryblok
    | MediaQuartetStoryblok
    | NewsCarouselStoryblok
    | PageHeroStoryblok
    | ProjectCarouselStoryblok
    | StatsStoryblok
    | TestImageStoryblok
    | TextBlockStoryblok
    | TextCarouselStoryblok
    | TextImageStoryblok
    | VideoStoryblok
  )[];
  seo?: {
    _uid?: string;
    title?: string;
    plugin?: string;
    og_image?: string;
    og_title?: string;
    description?: string;
    twitter_image?: string;
    twitter_title?: string;
    og_description?: string;
    twitter_description?: string;
    [k: string]: any;
  };
  listTitle?: string;
  listDescription?: string;
  cover?: AssetStoryblok;
  _uid: string;
  component: "KnowledgeBaseArticle";
  [k: string]: any;
}

export interface LatestProjectsCarouselStoryblok {
  headline?: string;
  numItems: string;
  textCards?: TextCardStoryblok[];
  showAllProjectsButton?: boolean;
  aspectRatio?: "" | "3/4" | "1/1" | "16/9";
  spacing?: "" | "auto" | "none" | "xs" | "sm" | "md" | "lg" | "xl";
  headingOrder?: string;
  anchor?: string;
  _uid: string;
  component: "LatestProjectsCarousel";
  [k: string]: any;
}

export interface LinkStoryblok {
  label: string;
  link: MultilinkStoryblok;
  preset?: "" | "primary" | "secondary" | "outline" | "link";
  _uid: string;
  component: "Link";
  [k: string]: any;
}

export interface LinkListStoryblok {
  spacing?: "" | "auto" | "none" | "xs" | "sm" | "md" | "lg" | "xl";
  headingOrder?: string;
  anchor?: string;
  headline?: string;
  links?: LinkListItemStoryblok[];
  _uid: string;
  component: "LinkList";
  [k: string]: any;
}

export interface LinkListItemStoryblok {
  label: string;
  link: MultilinkStoryblok;
  _uid: string;
  component: "LinkListItem";
  [k: string]: any;
}

export interface MediaStoryblok {
  asset?: AssetStoryblok;
  _uid: string;
  component: "Media";
  [k: string]: any;
}

export interface MediaGridStoryblok {
  numColumns: string;
  imageAspectRatio: "" | "3/4" | "1/1" | "16/9";
  containerWidth: "" | "content" | "wide" | "full";
  spacing: "" | "auto" | "none" | "xs" | "sm" | "md" | "lg" | "xl";
  anchor?: string;
  items?: (MediaStoryblok | HeadlineCardStoryblok)[];
  _uid: string;
  component: "MediaGrid";
  [k: string]: any;
}

export interface MediaQuartetStoryblok {
  blockTopLeft?: (MediaStoryblok | TextHeadlineCardStoryblok)[];
  blockBottomLeft?: (MediaStoryblok | TextHeadlineCardStoryblok)[];
  blockTopRight?: (MediaStoryblok | TextHeadlineCardStoryblok)[];
  blockBottomRight?: (MediaStoryblok | TextHeadlineCardStoryblok)[];
  containerWidth?: "" | "content" | "wide" | "full";
  spacing?: "" | "auto" | "none" | "xs" | "sm" | "md" | "lg" | "xl";
  anchor?: string;
  _uid: string;
  component: "MediaQuartet";
  [k: string]: any;
}

export interface NavigationStoryblok {
  label?: string;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  _uid: string;
  component: "Navigation";
  [k: string]: any;
}

export interface NavigationGroupStoryblok {
  label?: string;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  items?: NavigationStoryblok[];
  _uid: string;
  component: "NavigationGroup";
  [k: string]: any;
}

export interface NewsArchiveStoryblok {
  seo?: {
    _uid?: string;
    title?: string;
    plugin?: string;
    og_image?: string;
    og_title?: string;
    description?: string;
    twitter_image?: string;
    twitter_title?: string;
    og_description?: string;
    twitter_description?: string;
    [k: string]: any;
  };
  bodyBefore?: (
    | AccordionStoryblok
    | AnchorNavigationStoryblok
    | CallToActionStoryblok
    | ContactPersonStoryblok
    | EntryCarouselStoryblok
    | EntryListStoryblok
    | HomePageHeroStoryblok
    | ImageCarouselStoryblok
    | ImageDoubleStoryblok
    | ImageSingleStoryblok
    | ImageTeaserStoryblok
    | ItemListStoryblok
    | JobPostingListStoryblok
    | LatestProjectsCarouselStoryblok
    | LinkListStoryblok
    | MediaGridStoryblok
    | MediaQuartetStoryblok
    | NewsCarouselStoryblok
    | PageHeroStoryblok
    | ProjectCarouselStoryblok
    | StatsStoryblok
    | TestImageStoryblok
    | TextBlockStoryblok
    | TextCarouselStoryblok
    | TextImageStoryblok
    | VideoStoryblok
  )[];
  bodyAfter?: (
    | AccordionStoryblok
    | AnchorNavigationStoryblok
    | CallToActionStoryblok
    | ContactPersonStoryblok
    | EntryCarouselStoryblok
    | EntryListStoryblok
    | HomePageHeroStoryblok
    | ImageCarouselStoryblok
    | ImageDoubleStoryblok
    | ImageSingleStoryblok
    | ImageTeaserStoryblok
    | ItemListStoryblok
    | JobPostingListStoryblok
    | LatestProjectsCarouselStoryblok
    | LinkListStoryblok
    | MediaGridStoryblok
    | MediaQuartetStoryblok
    | NewsCarouselStoryblok
    | PageHeroStoryblok
    | ProjectCarouselStoryblok
    | StatsStoryblok
    | TestImageStoryblok
    | TextBlockStoryblok
    | TextCarouselStoryblok
    | TextImageStoryblok
    | VideoStoryblok
  )[];
  _uid: string;
  component: "NewsArchive";
  [k: string]: any;
}

export interface NewsArticleStoryblok {
  date?: string;
  title?: string;
  description?: RichtextStoryblok;
  image?: AssetStoryblok;
  featured?: boolean;
  newsTags?: (number | string)[];
  sites: (StoryblokStory<ConfigStoryblok> | string)[];
  body?: (
    | AccordionStoryblok
    | AnchorNavigationStoryblok
    | CallToActionStoryblok
    | ContactPersonStoryblok
    | EntryCarouselStoryblok
    | EntryListStoryblok
    | HomePageHeroStoryblok
    | ImageCarouselStoryblok
    | ImageDoubleStoryblok
    | ImageSingleStoryblok
    | ImageTeaserStoryblok
    | ItemListStoryblok
    | JobPostingListStoryblok
    | LatestProjectsCarouselStoryblok
    | LinkListStoryblok
    | MediaGridStoryblok
    | MediaQuartetStoryblok
    | NewsCarouselStoryblok
    | PageHeroStoryblok
    | ProjectCarouselStoryblok
    | StatsStoryblok
    | TestImageStoryblok
    | TextBlockStoryblok
    | TextCarouselStoryblok
    | TextImageStoryblok
    | VideoStoryblok
  )[];
  seo?: {
    _uid?: string;
    title?: string;
    plugin?: string;
    og_image?: string;
    og_title?: string;
    description?: string;
    twitter_image?: string;
    twitter_title?: string;
    og_description?: string;
    twitter_description?: string;
    [k: string]: any;
  };
  listTitle?: string;
  listDescription?: string;
  cover?: AssetStoryblok;
  _uid: string;
  component: "NewsArticle";
  [k: string]: any;
}

export interface NewsCarouselStoryblok {
  headline?: string;
  tags?: (number | string)[];
  numItems: string;
  textCards?: TextCardStoryblok[];
  aspectRatio?: "" | "3/4" | "1/1" | "16/9";
  spacing?: "" | "auto" | "none" | "xs" | "sm" | "md" | "lg" | "xl";
  headingOrder?: string;
  anchor?: string;
  _uid: string;
  component: "NewsCarousel";
  [k: string]: any;
}

export interface PageStoryblok {
  body?: (
    | AccordionStoryblok
    | AnchorNavigationStoryblok
    | CallToActionStoryblok
    | ContactPersonStoryblok
    | EntryCarouselStoryblok
    | EntryListStoryblok
    | HomePageHeroStoryblok
    | ImageCarouselStoryblok
    | ImageDoubleStoryblok
    | ImageSingleStoryblok
    | ImageTeaserStoryblok
    | ItemListStoryblok
    | JobPostingListStoryblok
    | LatestProjectsCarouselStoryblok
    | LinkListStoryblok
    | MediaGridStoryblok
    | MediaQuartetStoryblok
    | NewsCarouselStoryblok
    | PageHeroStoryblok
    | ProjectCarouselStoryblok
    | StatsStoryblok
    | TestImageStoryblok
    | TextBlockStoryblok
    | TextCarouselStoryblok
    | TextImageStoryblok
    | VideoStoryblok
  )[];
  seo?: {
    _uid?: string;
    title?: string;
    plugin?: string;
    og_image?: string;
    og_title?: string;
    description?: string;
    twitter_image?: string;
    twitter_title?: string;
    og_description?: string;
    twitter_description?: string;
    [k: string]: any;
  };
  showAnchorNavigation?: boolean;
  footerCtaVariant?: "" | "request" | "newsletter";
  _uid: string;
  component: "Page";
  [k: string]: any;
}

export interface PageHeroStoryblok {
  imageSize?: "" | "sm" | "md" | "lg";
  image?: AssetStoryblok;
  _uid: string;
  component: "PageHero";
  [k: string]: any;
}

export interface ProjectStoryblok {
  outdoor?: boolean;
  staircaseTypes?: (number | string)[];
  railings?: (number | string)[];
  staircaseMaterials?: (number | string)[];
  railingMaterials?: (number | string)[];
  stairTreadMaterials?: (number | string)[];
  handrailMaterials?: (number | string)[];
  staircaseShapes?: (number | string)[];
  staircaseStyles?: (number | string)[];
  staircaseColors?: (number | string)[];
  floors?: "" | "1" | "2" | "3" | "4" | "7" | "11";
  body?: (
    | AccordionStoryblok
    | AnchorNavigationStoryblok
    | CallToActionStoryblok
    | ContactPersonStoryblok
    | EntryCarouselStoryblok
    | EntryListStoryblok
    | HomePageHeroStoryblok
    | ImageCarouselStoryblok
    | ImageDoubleStoryblok
    | ImageSingleStoryblok
    | ImageTeaserStoryblok
    | ItemListStoryblok
    | JobPostingListStoryblok
    | LatestProjectsCarouselStoryblok
    | LinkListStoryblok
    | MediaGridStoryblok
    | MediaQuartetStoryblok
    | NewsCarouselStoryblok
    | PageHeroStoryblok
    | ProjectCarouselStoryblok
    | StatsStoryblok
    | TestImageStoryblok
    | TextBlockStoryblok
    | TextCarouselStoryblok
    | TextImageStoryblok
    | VideoStoryblok
  )[];
  title: string;
  description?: RichtextStoryblok;
  image?: AssetStoryblok;
  featured?: boolean;
  year?: string;
  group_location?: any;
  country?: number | string;
  place?: string;
  latitude?: string;
  longitude?: string;
  sites: (StoryblokStory<ConfigStoryblok> | string)[];
  seo?: {
    _uid?: string;
    title?: string;
    plugin?: string;
    og_image?: string;
    og_title?: string;
    description?: string;
    twitter_image?: string;
    twitter_title?: string;
    og_description?: string;
    twitter_description?: string;
    [k: string]: any;
  };
  listTitle?: string;
  listDescription?: string;
  cover?: AssetStoryblok;
  _uid: string;
  component: "Project";
  [k: string]: any;
}

export interface ProjectArchiveStoryblok {
  seo?: {
    _uid?: string;
    title?: string;
    plugin?: string;
    og_image?: string;
    og_title?: string;
    description?: string;
    twitter_image?: string;
    twitter_title?: string;
    og_description?: string;
    twitter_description?: string;
    [k: string]: any;
  };
  bodyBefore?: (
    | AccordionStoryblok
    | AnchorNavigationStoryblok
    | CallToActionStoryblok
    | ContactPersonStoryblok
    | EntryCarouselStoryblok
    | EntryListStoryblok
    | HomePageHeroStoryblok
    | ImageCarouselStoryblok
    | ImageDoubleStoryblok
    | ImageSingleStoryblok
    | ImageTeaserStoryblok
    | ItemListStoryblok
    | JobPostingListStoryblok
    | LatestProjectsCarouselStoryblok
    | LinkListStoryblok
    | MediaGridStoryblok
    | MediaQuartetStoryblok
    | NewsCarouselStoryblok
    | PageHeroStoryblok
    | ProjectCarouselStoryblok
    | StatsStoryblok
    | TestImageStoryblok
    | TextBlockStoryblok
    | TextCarouselStoryblok
    | TextImageStoryblok
    | VideoStoryblok
  )[];
  bodyAfter?: (
    | AccordionStoryblok
    | AnchorNavigationStoryblok
    | CallToActionStoryblok
    | ContactPersonStoryblok
    | EntryCarouselStoryblok
    | EntryListStoryblok
    | HomePageHeroStoryblok
    | ImageCarouselStoryblok
    | ImageDoubleStoryblok
    | ImageSingleStoryblok
    | ImageTeaserStoryblok
    | ItemListStoryblok
    | JobPostingListStoryblok
    | LatestProjectsCarouselStoryblok
    | LinkListStoryblok
    | MediaGridStoryblok
    | MediaQuartetStoryblok
    | NewsCarouselStoryblok
    | PageHeroStoryblok
    | ProjectCarouselStoryblok
    | StatsStoryblok
    | TestImageStoryblok
    | TextBlockStoryblok
    | TextCarouselStoryblok
    | TextImageStoryblok
    | VideoStoryblok
  )[];
  _uid: string;
  component: "ProjectArchive";
  [k: string]: any;
}

export interface ProjectCarouselStoryblok {
  headline?: string;
  textCards?: TextCardStoryblok[];
  numItems: string;
  featured?: boolean;
  staircaseTypes?: (number | string)[];
  railings?: (number | string)[];
  staircaseMaterials?: (number | string)[];
  railingMaterials?: (number | string)[];
  stairTreadMaterials?: (number | string)[];
  handrailMaterials?: (number | string)[];
  staircaseShapes?: (number | string)[];
  staircaseStyles?: (number | string)[];
  staircaseColors?: (number | string)[];
  floors?: "" | "1" | "2" | "3" | "4" | "7" | "11";
  outdoor?: boolean;
  aspectRatio?: "" | "3/4" | "1/1" | "16/9";
  spacing?: "" | "auto" | "none" | "xs" | "sm" | "md" | "lg" | "xl";
  headingOrder?: string;
  anchor?: string;
  _uid: string;
  component: "ProjectCarousel";
  [k: string]: any;
}

export interface QuoteStoryblok {
  text?: RichtextStoryblok;
  author?: string;
  _uid: string;
  component: "Quote";
  [k: string]: any;
}

export interface RichTextButtonStoryblok {
  label: string;
  link: MultilinkStoryblok;
  preset?: "" | "primary" | "secondary" | "outline" | "link";
  _uid: string;
  component: "RichTextButton";
  [k: string]: any;
}

export interface SocialLinkStoryblok {
  label: string;
  link: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  icon: "" | "facebook" | "houzz" | "instagram" | "linkedin" | "pinterest" | "x" | "xing" | "youtube";
  _uid: string;
  component: "SocialLink";
  [k: string]: any;
}

export interface StatsStoryblok {
  headline?: string;
  stats?: StatsItemStoryblok[];
  headingOrder?: string;
  anchor?: string;
  _uid: string;
  component: "Stats";
  [k: string]: any;
}

export interface StatsItemStoryblok {
  title?: string;
  value?: string;
  _uid: string;
  component: "StatsItem";
  [k: string]: any;
}

export interface TestImageStoryblok {
  image?: AssetStoryblok;
  imageChanged?: AssetStoryblok;
  _uid: string;
  component: "TestImage";
  [k: string]: any;
}

export interface TextBlockStoryblok {
  spacing?: "" | "auto" | "none" | "xs" | "sm" | "md" | "lg" | "xl";
  twoColumn?: boolean;
  headlineStyle?: "" | "xl" | "lg" | "md" | "sm";
  headingOrder?: string;
  anchor?: string;
  headline?: string;
  subline?: string;
  text?: RichtextStoryblok;
  links?: LinkStoryblok[];
  _uid: string;
  component: "TextBlock";
  [k: string]: any;
}

export interface TextCardStoryblok {
  text?: string;
  links?: LinkStoryblok[];
  _uid: string;
  component: "TextCard";
  [k: string]: any;
}

export interface TextCarouselStoryblok {
  spacing?: "" | "auto" | "none" | "xs" | "sm" | "md" | "lg" | "xl";
  headingOrder?: string;
  anchor?: string;
  headline?: string;
  items?: QuoteStoryblok[];
  _uid: string;
  component: "TextCarousel";
  [k: string]: any;
}

export interface TextHeadlineCardStoryblok {
  headline?: string;
  text?: string;
  links?: LinkStoryblok[];
  _uid: string;
  component: "TextHeadlineCard";
  [k: string]: any;
}

export interface TextImageStoryblok {
  imageAspectRatio?: "" | "original" | "3/4" | "1/1" | "16/9";
  imageLeft?: boolean;
  spacing?: "" | "auto" | "none" | "xs" | "sm" | "md" | "lg" | "xl";
  headlineStyle?: "" | "lg" | "md" | "sm";
  headlineOrder?: string;
  anchor?: string;
  image?: AssetStoryblok;
  headline?: string;
  text?: RichtextStoryblok;
  links?: LinkStoryblok[];
  _uid: string;
  component: "TextImage";
  [k: string]: any;
}

export interface TypescriptStoryblok {
  Text?: string;
  Textarea?: string;
  Richtext?: RichtextStoryblok;
  Number?: string;
  Datetime?: string;
  Date?: string;
  RequiredTranslatable: string;
  Boolean?: boolean;
  AssetImage?: AssetStoryblok;
  Link?: MultilinkStoryblok;
  MultiAssets?: MultiassetStoryblok;
  title?: string;
  _uid: string;
  component: "Typescript";
  [k: string]: any;
}

export interface VideoStoryblok {
  video?: AssetStoryblok;
  anchor?: string;
  poster?: AssetStoryblok;
  _uid: string;
  component: "Video";
  [k: string]: any;
}

export interface VideoBlockStoryblok {
  asset?: AssetStoryblok;
  _uid: string;
  component: "VideoBlock";
  [k: string]: any;
}

export interface VideoImageSplitStoryblok {
  video: AssetStoryblok;
  image: AssetStoryblok;
  imageLeft?: boolean;
  _uid: string;
  component: "VideoImageSplit";
  [k: string]: any;
}
