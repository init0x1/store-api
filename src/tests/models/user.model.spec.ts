import { UserModel } from '../../models/user.model'
import { User } from '../../types/UserType'

const userModel = new UserModel()

describe('User Model', () => {
  let createdUser: User

  beforeEach(async () => {
    const user: User = {
      email: 'test@example.com',
      password: 'password123',
      first_name: '0xAbdo',
      last_name: 'Ali'
    }
    createdUser = await userModel.create(user)
  })

  afterEach(async () => {
    await userModel.delete(createdUser.user_id as string)
  })

  it('should create a new user', async () => {
    const user: User = {
      email: 'newuser@example.com',
      password: 'newpassword123',
      first_name: 'New',
      last_name: '0xAbdo'
    }
    const created = await userModel.create(user)

    expect(created.email).toBe(user.email)
    expect(created.first_name).toBe(user.first_name)
    expect(created.last_name).toBe(user.last_name)
  })
  it('should retrieve all users', async () => {
    const users = await userModel.findAll()
    expect(users.length).toBeGreaterThan(0)

    const foundUser = users.find((user) => user.user_id === createdUser.user_id)
    expect(foundUser).toBeDefined()
    expect(foundUser?.email).toBe(createdUser.email)
    expect(foundUser?.first_name).toBe(createdUser.first_name)
    expect(foundUser?.last_name).toBe(createdUser.last_name)
  })

  it('should retrieve a user by ID', async () => {
    const user = await userModel.show(createdUser.user_id!)
    expect(user?.email).toEqual(createdUser.email)
    expect(user?.first_name).toBe(createdUser.first_name)
    expect(user?.last_name).toBe(createdUser.last_name)
  })

  it('should update a user', async () => {
    const updatedUser: User = {
      ...createdUser,
      email: 'updated@example.com',
      first_name: 'Updated'
    }
    const updated = await userModel.update(updatedUser)

    expect(updated.email).toBe(updatedUser.email)
    expect(updated.first_name).toBe(updatedUser.first_name)
    expect(updated.last_name).toBe(updatedUser.last_name)
  })

  it('should delete a user', async () => {
    await userModel.delete(createdUser.user_id!)
    const users = await userModel.findAll()

    expect(users.length).toBe(1)
  })

  it('should authenticate a user with correct credentials', async () => {
    const email = createdUser.email
    const password = 'password123'
    const authenticatedUser = await userModel.authenticate(email, password)

    expect(authenticatedUser?.email).toEqual(createdUser.email)
    expect(authenticatedUser?.first_name).toEqual(createdUser.first_name)
    expect(authenticatedUser?.last_name).toEqual(createdUser.last_name)
  })

  it('should not authenticate a user with incorrect password', async () => {
    const email = createdUser.email
    const password = 'incorrectpassword'
    const authenticatedUser = await userModel.authenticate(email, password)

    expect(authenticatedUser).toBeNull()
  })

  it('should not authenticate a user with incorrect email', async () => {
    const email = 'incorrect@example.com'
    const password = 'password123'

    try {
      const authenticatedUser = await userModel.authenticate(email, password)
      expect(authenticatedUser).toBeNull()
    } catch (error: any) {
      expect(error.message.trim()).toBe('error while user login')
    }
  })
})
