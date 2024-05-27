package com.example.tfmmobile.domain.model.usecase

import com.example.tfmmobile.domain.model.user.UserRepository
import javax.inject.Inject

class UserUseCase @Inject constructor(private val userRepository: UserRepository) {

    suspend operator fun invoke(id: Long, userName: String, firstName: String, lastName: String, email: String) =
        userRepository.updateProfile(id, userName, firstName, lastName, email)
    suspend operator fun invoke(id: Long, oldPassword: String, newPassword: String) =
        userRepository.changePassword(id, oldPassword, newPassword)
}