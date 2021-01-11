console.log('This script populates database.');

const async = require('async');
const Item = require('./models/item');
const Comment = require('./models/comment');
const Manufacturer = require('./models/manufacturer');
const Subcategory = require('./models/subcategory');
const Category = require('./models/category');
const mongoDB = require('./mongoDBkey');

const mongoose = require('mongoose');
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const items = [];
const comments = [];
const manufacturers = [];
const subcategories = [];
const categories = [];

function manufacturerCreate(name, cb) {
  const manufacturer = new Manufacturer({ name: name });

  manufacturer.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New manufacturer:' + manufacturer);
    manufacturers.push(manufacturer);
    cb(null, manufacturer);
  });
}

function commentCreate(author, content, rating, cb) {
  const comment = new Comment({
    author: author,
    content: content,
    rating: rating,
  });

  comment.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New comment:' + comment);
    comments.push(comment);
    cb(null, comment);
  });
}

function categoryCreate(name, description, cb) {
  const category = new Category({ name: name, description: description });

  category.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New category:' + category);
    categories.push(category);
    cb(null, category);
  });
}

function subcategoryCreate(name, description, parentCategory, cb) {
  const subcategory = new Subcategory({
    name: name,
    description: description,
    parentCategory: parentCategory,
  });

  subcategory.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New subcategory:' + subcategory);
    subcategories.push(subcategory);
    cb(null, subcategory);
  });
}

function itemCreate(
  name,
  description,
  subcategory,
  manufacturer,
  price,
  stock,
  comments,
  cb,
) {
  const item = new Item({
    name: name,
    description: description,
    subcategory: subcategory,
    manufacturer: manufacturer,
    price: price,
    stock: stock,
    comments: comments,
  });

  item.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New item:' + item);
    items.push(item);
    cb(null, item);
  });
}

function createManufacturers(cb) {
  async.series(
    [
      function (callback) {
        manufacturerCreate('Toshiba', callback);
      },
      function (callback) {
        manufacturerCreate('Apple', callback);
      },
      function (callback) {
        manufacturerCreate('Sandisk', callback);
      },
      function (callback) {
        manufacturerCreate('Gigabyte', callback);
      },
      function (callback) {
        manufacturerCreate('Zotac', callback);
      },
      function (callback) {
        manufacturerCreate('Msi', callback);
      },
      function (callback) {
        manufacturerCreate('JBL', callback);
      },
      function (callback) {
        manufacturerCreate('Corsair', callback);
      },
    ],
    cb,
  );
}

function createComments(cb) {
  async.series(
    [
      function (callback) {
        commentCreate('Lucas', 'Great headphones!', 5, callback);
      },
      function (callback) {
        commentCreate('Mark', 'Best on the market!', 5, callback);
      },
      function (callback) {
        commentCreate('Jeff', 'New SSD gave my old PC new life.', 4, callback);
      },
      function (callback) {
        commentCreate(
          'Anna',
          'New iPhone is looking good, but lack of some peripherals is annoying.',
          3,
          callback,
        );
      },
      function (callback) {
        commentCreate('Lucy', 'I love my new iPhone!', 5, callback);
      },
      function (callback) {
        commentCreate(
          'Barry',
          'Gotta play some minecraft with RTX on now.',
          4,
          callback,
        );
      },
    ],
    cb,
  );
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate(
          'Headphones, microphones, speakers',
          'Anything related to sound.',
          callback,
        );
      },
      function (callback) {
        categoryCreate('Computer parts', 'Build your own PC.', callback);
      },
      function (callback) {
        categoryCreate('Smartphones', 'Pockets PCs.', callback);
      },
    ],
    cb,
  );
}

function createSubcategories(cb) {
  async.series(
    [
      function (callback) {
        subcategoryCreate(
          'Noice-canceling headphones',
          'When you need to isolate yourself.',
          categories[0],
          callback,
        );
      },
      function (callback) {
        subcategoryCreate(
          'SSDs',
          'Fastest drives for your PC.',
          categories[1],
          callback,
        );
      },
      function (callback) {
        subcategoryCreate(
          'HDDs',
          'Biggest storage devices',
          categories[1],
          callback,
        );
      },
      function (callback) {
        subcategoryCreate(
          'RAM',
          'For all your memory needs',
          categories[1],
          callback,
        );
      },
      function (callback) {
        subcategoryCreate(
          'GPUs',
          'Best rendering devices.',
          categories[1],
          callback,
        );
      },
      function (callback) {
        subcategoryCreate(
          'iOS',
          'iOS based smartphones.',
          categories[2],
          callback,
        );
      },
      function (callback) {
        subcategoryCreate(
          'Android',
          'Android based smartphones.',
          categories[2],
          callback,
        );
      },
    ],
    cb,
  );
}

function createItems(cb) {
  async.series(
    [
      function (callback) {
        itemCreate(
          'LIVE 650BTNC Wireless Bluetooth Noise-Cancelling Headphones',
          "Noise-cancelling pretty much does what it says - it cuts out ambient noise so you'll hear more of your music. It's perfect if you want to mute the rumble of the train, or dim background conversations while you're in the office.",
          subcategories[0],
          manufacturers[6],
          200,
          14,
          [comments[0]],
          callback,
        );
      },
      function (callback) {
        itemCreate(
          'Extreme Portable External SSD - 500 GB',
          'Pocket-sized yet powerful, the Sandisk Extreme External SSD transfers data up to 550 MB/s and fits in your palm.',
          subcategories[1],
          manufacturers[2],
          90,
          8,
          [comments[2]],
          callback,
        );
      },
      function (callback) {
        itemCreate(
          'iPhone 12 Pro Max - 128 GB',
          '5G goes Pro. A14 Bionic rockets past every other smartphone chip. The Pro camera system takes low-light photography to the next level.',
          subcategories[5],
          manufacturers[1],
          1220,
          10,
          [comments[3], comments[4]],
          callback,
        );
      },
      function (callback) {
        itemCreate(
          'GeForce RTX 3080 10 GB GAMING OC',
          "The GeForce RTX 3080 has TITAN class performance, powered by Ampere – NVIDIA's 2nd gen RTX architecture. Featuring AI performance and enhanced ray tracing as well as a massive 10 GB of memory, it's designed to deliver the ultimate gaming performance.",
          subcategories[4],
          manufacturers[3],
          830,
          2,
          [comments[5], comments[1]],
          callback,
        );
      },
      function (callback) {
        itemCreate(
          'DDR3 1600 MHz PC RAM - 8 GB',
          'With extra RAM on board, you can optimise your computer to perform in a way that keeps up with multimedia editing suites (like photo, graphics and video software) or the latest games.',
          subcategories[3],
          manufacturers[7],
          45,
          24,
          [],
          callback,
        );
      },
      function (callback) {
        itemCreate(
          'Canvio Basics Portable Hard Drive - 1 TB',
          'Safeguard your files with the Toshiba Canvio Basics Portable Hard Drive. Requiring no software installation, a SuperSpeed USB 3.0 lets you quickly backup music, photos, and all your important data for safekeeping.',
          subcategories[2],
          manufacturers[0],
          50,
          12,
          [],
          callback,
        );
      },
    ],
    cb,
  );
}

async.series(
  [
    createManufacturers,
    createComments,
    createCategories,
    createSubcategories,
    createItems,
  ],
  function (err, results) {
    if (err) {
      console.log('FINAL ERROR: ' + err);
    }
    mongoose.connection.close();
  },
);
