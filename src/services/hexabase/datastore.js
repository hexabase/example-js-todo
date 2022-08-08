import { getHexabaseClient } from "./user";

const getItems = async (applicationId, datastoreId, page, perPage) => {
  const params = {
    page: page,
    per_page: perPage,
    use_display_id: true,
  };
  const client = await getHexabaseClient();
  const result = await client.items.get(params, datastoreId, applicationId);
  return result.dsItems.items;
};

const getItem = async (applicationId, datastoreId, itemId) => {
  const client = await getHexabaseClient();
  const response = await client.items.getItemDetail(
    datastoreId,
    itemId,
    applicationId,
    {
      format: "map",
    }
  );
  return response.itemDetails.field_values;
};

const newItem = async (applicationId, datastoreId, item) => {
  const params = {
    item: item,
  };
  const client = await getHexabaseClient();
  return client.items.create(applicationId, datastoreId, params);
};

const updateItem = async (applicationId, datastoreId, itemId, item, revNo) => {
  const params = {
    item: item,
    rev_no: Number(revNo),
  };
  const client = await getHexabaseClient();
  return client.items.update(applicationId, datastoreId, itemId, params);
};

const deleteItem = async (applicationId, datastoreId, itemId) => {
  const client = await getHexabaseClient();
  return client.items.delete(applicationId, datastoreId, itemId, {});
};

const executeAction = async (
  applicationId,
  datastoreId,
  itemId,
  actionId,
  revNo
) => {
  const params = {
    rev_no: Number(revNo),
    use_display_id: true,
  };
  const client = await getHexabaseClient();
  return client.items.execute(
    applicationId,
    datastoreId,
    itemId,
    actionId,
    params
  );
};

export default {
  getItems: getItems,
  getItem: getItem,
  newItem: newItem,
  updateItem: updateItem,
  deleteItem: deleteItem,
  executeAction: executeAction,
};
