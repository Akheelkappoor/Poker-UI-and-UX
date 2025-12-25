const safeJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return {};
  }
};

export const createRoom = async (url, payload) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return { response, data: await safeJson(response) };
};

export const getRoom = async (url, roomId) => {
  const response = await fetch(
    `${url}?roomId=${encodeURIComponent(roomId)}`,
    { cache: "no-store" }
  );
  return { response, data: await safeJson(response) };
};

export const joinRoom = async (url, payload) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return { response, data: await safeJson(response) };
};

export const rejoinRoom = async (url, payload) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return { response, data: await safeJson(response) };
};

export const startGame = async (url, roomId) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roomId }),
  });
  return { response, data: await safeJson(response) };
};

export const leaveRoom = async (url, payload) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return { response, data: await safeJson(response) };
};

export const raise = async (url, payload) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return { response, data: await safeJson(response) };
};

export const moveNext = async (url, payload) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return { response, data: await safeJson(response) };
};

export const setRound = async (url, payload) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return { response, data: await safeJson(response) };
};

export const markFailed = async (url, payload) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return { response, data: await safeJson(response) };
};
