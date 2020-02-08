import ls from "local-storage";

export const setConversationArray = (businessId, conversationId) => {
  let current = ls.get("conversationArray");
  let index = null;
  if (current) {
    index = current.findIndex(element => element.businessId === businessId);
    console.log("index: ", index);
    if (index !== -1) {
      //console.log("1");
      current[index].conversationId = conversationId;
    } else {
      //console.log("2");
      current = [
        ...current,
        { businessId: businessId, conversationId: conversationId, liveId: "" }
      ];
    }
  } else {
    //console.log("3");
    current = [
      { businessId: businessId, conversationId: conversationId, liveId: "" }
    ];
  }

  ls.set("conversationArray", current);
};
export const setConversationIdValue = businessId => {
  const array = ls.get("conversationArray");

  if (array) {
    const element = array.find(element => element.businessId === businessId);
    if (element) {
      ls.set("conversationId", element.conversationId);
    }
  }
};

export const setLiveArray = (businessId, liveId) => {
  let current = ls.get("conversationArray");
  let index = null;
  if (current) {
    index = current.findIndex(element => element.businessId === businessId);
    console.log("index: ", index);
    if (index !== -1) {
      //console.log("1");
      current[index].liveId = liveId;
    } else {
      console.log("Error with live setting");
      /*current = [
          ...current,
          { businessId: businessId, liveId: liveId }
        ];*/
    }
  } else {
    //console.log("3");
    console.log("Error with live setting");
    //current = [{ businessId: businessId, conversationId: conversationId }];
  }

  ls.set("conversationArray", current);
};

export const getLiveIdValue = businessId => {
  const array = ls.get("conversationArray");

  if (array) {
    const element = array.find(element => element.businessId === businessId);
    if (element) {
      return element.liveId;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export const setSentHistory = (businessId, message, status) => {
  let current = ls.get("sentHistoryArray");
  let index = null;
  if (current) {
    index = current.findIndex(element => element.businessId === businessId);
    console.log("index: ", index);
    if (index !== -1) {
      //console.log("1");
      current[index].history = { message: message, status: status };
    } else {
      //console.log("Error with live setting");
      current = [
        ...current,
        {
          businessId: businessId,
          history: { message: message, status: status }
        }
      ];
    }
  } else {
    //console.log("3");
    //console.log("Error with live setting");
    current = [
      { businessId: businessId, history: { message: message, status: status } }
    ];
  }

  ls.set("sentHistoryArray", current);
};

export const getSentHistory = businessId => {
  const array = ls.get("sentHistoryArray");

  if (array) {
    const element = array.find(element => element.businessId === businessId);
    if (element) {
      return element.history;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const load = url => {
  return new Promise(function(resolve, reject) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};
