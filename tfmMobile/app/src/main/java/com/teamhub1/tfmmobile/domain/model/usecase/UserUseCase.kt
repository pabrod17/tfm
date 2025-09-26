package com.teamhub1.tfmmobile.domain.model.usecase

import com.teamhub1.tfmmobile.domain.model.user.UserRepository
import javax.inject.Inject

class UserUseCase @Inject constructor(private val userRepository: UserRepository) {

    suspend operator fun invoke(id: Long, userName: String, firstName: String, lastName: String, email: String) =
        userRepository.updateProfile(id, userName, firstName, lastName, email)
    suspend operator fun invoke(id: Long, oldPassword: String, newPassword: String) =
        userRepository.changePassword(id, oldPassword, newPassword)
}