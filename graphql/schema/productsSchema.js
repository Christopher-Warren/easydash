module.exports = productSchema = `
input ProductInput {
    _id: ID
    name: String!
    category: String!
    subcategory: String!
    description: String!
    price: Float!
    stock: Float!
}

input ModifyProductInput {
    _id: ID!
    name: String
    category: String
    subcategory: String
    description: String
    price: Float
    stock: Float
}

input CategoryInput {
    _id: ID!
    name: String
}

input SubcategoryInput {
    _id: ID!
    name: String
}

input GetProductInput {
    limit: Float
    skip: Float
    sort: String
    order: Float
    search: String
    filter: [Filter]
}



type Product {
    _id: ID!
    name: String!
    category: Category!
    subcategory: Subcategory!
    description: String!
    price: Float!
    createdAt: String!
    images: [String]
    stock: Float!
    searchScore: Float
}


type Subcategory {
    _id: ID!
    name: String
    description: String
    products: [Product!]
}

type Category {
    _id: ID!
    name: String!
    description: String
    subcategories: [Subcategory!]
    products: [Product!]
}

input FilterOptions {
    in: [String]
    gte: Float
    lte: Float
    eq: String
}




input Filter {
    field: String
    query: FilterOptions
    
}

`
