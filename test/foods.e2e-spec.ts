import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ConfigModule } from '@nestjs/config';
import {FoodModule, Food } from '@modules';

describe('Category e2e', () => {
  let app: INestApplication;
  let sequelize: Sequelize;
  let foodId: number;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ".env.test"
        }),
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          models: [Food],
          autoLoadModels: true,
          sync: { force: true },
          logging: false,
          synchronize: true,
        }),
        FoodModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    sequelize = moduleRef.get<Sequelize>(Sequelize);
  });

  afterAll(async () => {
    await app.close();
    await sequelize.close();
  });


  it('/POST foods (Create food)', async () => {
    const foodData = {
      name: 'Gamburger',
      category_id: 1,
      image: 'image.png',
      price: 150,
      description: "ok good",
    };

    const response = await request(app.getHttpServer())
      .post('/foods/add')
      .send(foodData)
      .expect(201);

    const food = response.body;
    foodId = food.id;
    expect(food.id).toBeDefined();
    expect(food.name).toEqual('Gamburger');
    expect(food.category_id).toEqual(1);
    expect(food.image).toEqual('image.png');
    expect(food.price).toEqual(150);
    expect(food.description).toEqual('ok good');
  });


  it('/GET foods (Retrieve All Foods)', async () => {
    const response = await request(app.getHttpServer())
      .get('/foods')
      .expect(200);

    const foods = response.body;
    expect(Array.isArray(foods)).toBe(true);
    expect(foods.length).toBeGreaterThan(0);
    expect(foods[0].name).toEqual('Gamburger');
    expect(foods[0].category_id).toEqual(1);
    expect(foods[0].image).toEqual('image.png');
    expect(foods[0].price).toEqual(150);
    expect(foods[0].description).toEqual('ok good');
  });


  it('/PUT foods/edit/:id (Update Food)', async () => {
    const updatedFoodData = {
      name: 'Updated Gamburger',
    };

    await request(app.getHttpServer())
      .put(`/foods/edit/${foodId}`)
      .send(updatedFoodData)
      .expect(200);
  });

  // Delete a food by ID
  it('/DELETE foods/delete/:id (Delete Food)', async () => {
    await request(app.getHttpServer())
      .delete(`/foods/delete/${foodId}`)
      .expect(200);
  });
});
