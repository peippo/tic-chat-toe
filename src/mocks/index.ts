async function initMocks() {
  try {
    if (typeof window === "undefined") {
      const { server } = await import("./server");
      server.listen();
    } else {
      const { worker } = await import("./browser");
      worker.start().catch((error) => {
        console.error("Error starting worker:", error);
      });
    }
  } catch (error) {
    console.error("Error initializing mocks:", error);
  }
}

initMocks().catch((error) => {
  console.error("Error initializing mocks:", error);
});

export {};
