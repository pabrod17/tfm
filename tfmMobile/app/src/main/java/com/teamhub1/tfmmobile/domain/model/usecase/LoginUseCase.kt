package com.teamhub1.tfmmobile.domain.model.usecase

import com.teamhub1.tfmmobile.domain.model.user.UserRepository
import javax.inject.Inject

class LoginUseCase @Inject constructor(private val userRepository: UserRepository) {

    suspend operator fun invoke(userName: String, password: String) =
        userRepository.login(userName, password)
}