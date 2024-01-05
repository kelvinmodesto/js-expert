export default class ECommerce {
  update({ id, userName }) {
    console.log(
      `[${id}]: [ecommerce] your order will be separated to be shipment ${userName}`
    );
  }
}
