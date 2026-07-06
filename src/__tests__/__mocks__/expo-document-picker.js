module.exports = {
  getDocumentAsync: jest.fn().mockResolvedValue({
    canceled: false,
    assets: [
      {
        name: 'document.pdf',
        uri: 'file:///tmp/document.pdf',
        size: 1024,
        mimeType: 'application/pdf',
      },
    ],
  }),
};
