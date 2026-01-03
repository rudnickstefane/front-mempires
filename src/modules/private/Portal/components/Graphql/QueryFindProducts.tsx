import { gql } from 'graphql-request';

export const QueryFindProducts = gql`
  query FindProducts($request: String!, $companyCode: Int) {
    findProducts(request: $request, companyCode: $companyCode) {
      productCode
      companyCode
      fantasyName
      type
      ean
      sku
      brand
      model
      images {
        imageCode
        image
        primary
      }
      name
      description
      inventory
      price
      width
      height
      length
      weight
      discountPercent
      discountAmount
      sale
      warranty
      status
      shippingType
      shippingCost
      freeShipping
      soldQuantity
      totalRatings
      averageRating
      installments
      freeInstallments
      installmentRate
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
