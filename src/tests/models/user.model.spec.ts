import { UserModel } from '../../models/user.model'
import { User } from '../../types/UserType'

const userModel = new UserModel()

const testUser: User = {
  email: 'test@0xabdo.com',
  first_name: 'Abdelrahman',
  last_name: 'Ali',
  password: 'A123159A'
}

let user0: User
let user1: User

describe('User Model Test', () => {
  beforeAll(async () => {
    user0 = await userModel.create({
      email: 'user0@0xabdo.com',
      password: 'user0',
      first_name: 'user',
      last_name: 'zero'
    })
  })

  afterAll(async () => {
    await userModel.delete(user1.user_id as string)
  })

  it('should have a findAll method', () => {
    expect(userModel.findAll).toBeDefined()
  })

  it('should have a show method', () => {
    expect(userModel.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(userModel.create).toBeDefined()
  })

  it('should have an update method', () => {
    expect(userModel.update).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(userModel.delete).toBeDefined()
  })

  it('should have an authenticate method', () => {
    expect(userModel.authenticate).toBeDefined()
  })

  it('should create a new user', async () => {
    user1 = await userModel.create(testUser)

    expect(user1.email).toBe(testUser.email)
    expect(user1.first_name).toBe(testUser.first_name)
    expect(user1.last_name).toBe(testUser.last_name)
  })

  it('should retrieve all users', async () => {
    const users = await userModel.findAll()

    expect(users.length).toBeGreaterThan(0)

    expect(users[0]?.email).toBe(user0.email)
    expect(users[0]?.first_name).toBe(user0.first_name)
    expect(users[0]?.last_name).toBe(user0.last_name)

    expect(users[1]?.email).toBe(testUser.email)
    expect(users[1]?.first_name).toBe(testUser.first_name)
    expect(users[1]?.last_name).toBe(testUser.last_name)
  })

  it('should retrieve a user by ID', async () => {
    const user = await userModel.show(user0.user_id as string)

    expect(user?.email).toEqual(user0.email)
    expect(user?.first_name).toBe(user0.first_name)
    expect(user?.last_name).toBe(user0.last_name)
  })

  it('should update a user', async () => {
    const updatedUser: User = {
      user_id: user0.user_id as string,
      email: 'updated@example.com',
      first_name: 'Updated',
      last_name: 'Updated',
      password: 'new pass'
    }

    const updated = await userModel.update(updatedUser)

    expect(updated.email).toBe(updatedUser.email)
    expect(updated.first_name).toBe(updatedUser.first_name)
    expect(updated.last_name).toBe(updatedUser.last_name)
  })

  it('should delete a user', async () => {
    await userModel.delete(user0.user_id as string)
    const users = await userModel.findAll()
    expect(users.length).toBe(1)
  })

  it('should authenticate a user with correct credentials', async () => {
    const email = testUser.email
    const password = testUser.password
    const authenticatedUser = await userModel.authenticate(email, password)

    expect(authenticatedUser?.email).toEqual(testUser.email)
    expect(authenticatedUser?.first_name).toEqual(testUser.first_name)
    expect(authenticatedUser?.last_name).toEqual(testUser.last_name)
  })

  it('should not authenticate a user with incorrect password', async () => {
    const email = testUser.email
    const password = 'incorrectpassword'
    const authenticatedUser = await userModel.authenticate(email, password)

    expect(authenticatedUser).toBeNull()
  })

  it('should not authenticate a user with incorrect email', async () => {
    const email = 'incorrect@example.com'
    const password = testUser.password

    try {
      const authenticatedUser = await userModel.authenticate(email, password)
      expect(authenticatedUser).toBeNull()
    } catch (error: any) {
      expect(error.message.trim()).toBe('error while user login')
    }
  })
})
