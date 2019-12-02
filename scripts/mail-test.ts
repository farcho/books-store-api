import * as mail from '../src/utils/mail';

(async () => {
  try {
    await mail.send({
      to: 'farcho.barrera@gmail.com',
      subject: 'This is awesome',
      markdown: '# Hello world!\n\nThis is a **markdown** message'
    });

    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
})();
