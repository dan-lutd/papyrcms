export class DbModel {
  id!: string
}

export class Page extends DbModel {
  title!: string
  className!: string
  route!: string
  navOrder!: number
  css!: string
  omitDefaultHeader!: boolean
  omitDefaultFooter!: boolean
  sections!: Section[]
  updatedAt!: Date
  createdAt!: Date
}

export class Section extends DbModel {
  order!: number
  type!: string
  tags!: string[]
  title!: string
  className!: string
  updatedAt!: Date
  createdAt!: Date
}

export class User extends DbModel {
  email!: string
  firstName!: string
  lastName!: string
  isAdmin!: boolean
  isSubscribed!: boolean
  isBanned!: boolean
  address1?: string
  address2?: string
  city?: string
  state?: string
  country?: string
  zip?: string
  shippingFirstName?: string
  shippingLastName?: string
  shippingEmail?: string
  shippingAddress1?: string
  shippingAddress2?: string
  shippingCity?: string
  shippingState?: string
  shippingCountry?: string
  shippingZip?: string
  cart!: Product[]
  updatedAt!: Date
  createdAt!: Date
}

export class Post extends DbModel {
  title!: string
  tags!: string[]
  slug!: string
  media!: string
  content!: string
  isPublished!: boolean
  updatedAt!: Date
  createdAt!: Date
}

export class Blog extends Post {
  publishedAt?: Date
  comments!: Comment[]
}

export class Comment extends DbModel {
  content!: string
  replies!: Comment[]
  author!: User
  updatedAt!: Date
  createdAt!: Date
}

export class Event extends Post {
  date!: Date
  latitude?: number
  longitude?: number
  address?: string
}

export class Product extends Post {
  price!: number
  quantity!: number
}

export class Order extends DbModel {
  notes!: string
  products!: Product[]
  user?: User
  isShipped!: boolean
  updatedAt!: Date
  createdAt!: Date
}

export class Message extends DbModel {
  name!: string
  email!: string
  message!: string
  emailSent!: boolean
  updatedAt!: Date
  createdAt!: Date
}

export class Settings extends DbModel {
  name!: string
  options!: Record<string, any>
  createdAt!: Date
  updatedAt!: Date
}

export class AppSettings {
  enableMenu!: boolean
  enableStore!: boolean
  storeMenuLocation!: number
  enableBlog!: boolean
  blogMenuLocation!: number
  enableEvents!: boolean
  eventsMenuLocation!: number
  enableCommenting!: boolean
  enableRegistration!: boolean
  enableEmailingToAdmin!: boolean
  enableEmailingToUsers!: boolean
}

export class SectionOptions {
  [key: string]: {
    component: string
    name: string
    description: string
    inputs: string[]
    maxPosts?: number
    defaultProps: any
  }
}

export class Keys {
  stripePublishableKey!: string
  stripeSecretKey?: string
  gmailClientId?: string
  gmailClientSecret?: string
  gmailRefreshToken?: string
  googleAnalyticsId!: string
  googleMapsKey!: string
  siteEmail?: string
  adminEmail?: string
  cloudinaryApiKey?: string
  cloudinaryApiSecret?: string
  cloudinaryCloudName?: string
  tinyMceKey?: string
  databaseDriver?: string
  databaseURI?: string
  rootURL?: string
  jwtSecret?: string
  test?: {
    oldPass?: string
    newPass?: string
    token?: string
    tokenRpc?: string
  }
}

type Fields = {
  [key: string]: any
}

type Conditions = {
  [key: string]: any
}

type Options = {
  sort?: { [key: string]: number }
  include?: string[]
}

export class Database {
  findOne!: <M>(
    model: M,
    conditions: Conditions,
    options?: Options
  ) => M
  findAll!: <M>(
    model: M,
    conditions?: Conditions,
    options?: Options
  ) => M[]
  update!: <M>(
    model: M,
    conditions: Conditions,
    fields: Fields
  ) => void
  create!: <M>(model: M, fields: Fields) => M
  destroy!: <M>(model: M, conditions: Conditions) => void
  destroyAll!: <M>(model: M, conditions?: Conditions) => void
  countAll!: <M>(model: M) => number
}