Schemas = {};

Clients = new Mongo.Collection("clients");

Schemas.Clients = new SimpleSchema({
  id: {
    type: String
  },
  deviceType: {
    type: String
  },
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  name: {
    type: String
  },
  x: {
    type: Number,
    min: 0.0,
    max: 1.0,
    decimal: true
  },
  y: {
    type: Number,
    min: 0.0,
    max: 1.0,
    decimal: true
  },
  z: {
    type: Number,
    min: 0.0,
    max: 1.0,
    decimal: true
  },
  angle: {
    type: Number,
    min: 0.0,
    max: 1.0,
    decimal: true
  },
  ratioX: {
    type: Number,
    decimal: true
  },
  ratioY: {
    type: Number,
    decimal: true
  }
});

Clients.attachSchema(Schemas.Clients);

AdminConfig = {
  name: 'Huddle Orbiter',
  adminEmails: ['roman.raedle@outlook.com'],
  collections: {
    Clients: {}
  }
}
