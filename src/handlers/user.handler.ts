import { Request, Response } from 'express'
import { UserModel } from '../models/user.model'
import { User } from '../types/UserType'
import { generateToken } from '../utils/token-operations'

const userModel = new UserModel()

//create User
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, first_name, last_name } = req.body
    if (!email || !password || !first_name || !last_name) {
      res.status(400).json({
        error:
          'Missing/Invalid parameters, the following parameters are required: email, password, first_name, last_name'
      })
      return
    }

    const user: User = {
      email,
      password,
      first_name,
      last_name
    }

    const newUser: User = await userModel.create(user)
    const userToken = generateToken(newUser)

    res.status(200).json({ newUser, userToken })
  } catch (error) {
    res.status(400).json({ error: 'error while Creating User ' })
  }
}

//get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: User[] = await userModel.findAll()
    if (!users.length) {
      res.status(404).json({ message: 'No Users Found' })
      return
    }
    res.status(200).json({ users })
  } catch (error) {
    res.status(400).json({ error: 'error while getting Users ' })
  }
}

//get user by its id
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.user_id
    if (!userId) {
      res.status(400).json('Missing or invalid parameters, user_id Are Required! ')
      return
    }
    const user: User = await userModel.show(req.params.user_id as string)
    if (!user) {
      res.status(404).json({ message: `user not found` })
      return
    }
    res.status(200).json({ user })
  } catch (error) {
    res.status(400).json({ error: 'error while getting User  ' })
  }
}

//update user

export const UpdateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: User = {
      user_id: req.params.user_id as string,
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name
    }
    if (!user.email || !user.password || !user.first_name || !user.last_name) {
      res.status(400).json({
        error:
          'Missing/Invalid parameters, the following parameters are required:  email, password, first_name, last_name'
      })
      return
    }
    const isUser = await userModel.show(user.user_id as string)
    if (!isUser) {
      res.status(400).json({ error: 'User Not Found To Be Updated ' })
      return
    }
    const updatedUser = await userModel.update(user)
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ error: 'error while Updateing  User  ' })
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_Id = req.params.user_id as string
    if (!user_Id) {
      res.status(400).json({ message: 'User ID is required' })
      return
    }
    if (!(await userModel.show(user_Id))) {
      res.status(404).json({ error: 'user not found' })
      return
    }
    await userModel.delete(user_Id)

    res.status(200).json('user deleted')
  } catch (error) {
    res.status(400).json({ error: 'error while Deleting User' })
  }
}

// login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userModel.authenticate(req.body.email as string, req.body.password as string)
    if (user) {
      const user_Token = generateToken(user)
      res.status(200).json({ Login: 'Success', user: user, token: user_Token })
    } else {
      res.status(401).json({ Login: 'Failed' })
    }
  } catch (error) {
    res.status(401).json({ Login: 'Failed, Error While Login' })
  }
}
