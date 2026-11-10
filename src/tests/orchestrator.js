import retry from "async-retry";

async function waitforAllServices() {
  await waitForServer();

  async function waitForServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });
  }

  async function fetchStatusPage() {
    const response = await fetch("http://localhost:3000/api/status");
    if (response.status !== 200) {
      throw new Error();
    }
  }
}

export default {
  waitforAllServices,
};
