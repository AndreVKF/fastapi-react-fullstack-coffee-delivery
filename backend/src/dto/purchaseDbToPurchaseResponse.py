from src.schemas.purchases import Purchase, PurchaseResponse, PurchaseProductResponseBase

def purchaseDbToPurchaseResponse(purchase: Purchase) -> PurchaseResponse:
    
    productsPurchaseList = [
            PurchaseProductResponseBase(
                product_id=purchaseProduct.product_id,
                quantity=purchaseProduct.quantity,
                price=purchaseProduct.product.price,
                image_url=purchaseProduct.product.image_url,
                name=purchaseProduct.product.name
                ) for purchaseProduct in purchase.purchase_products
            ]
    
    
    purchaseResponse = PurchaseResponse(
        id=purchase.id,
        user_id=purchase.user_id,
        purchase_date=purchase.purchase_date,
        payment_type=purchase.payment_type,
        delivery_address=purchase.delivery_address,
        products_purchase=productsPurchaseList
    )
    
    return purchaseResponse