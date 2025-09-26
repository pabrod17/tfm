package com.teamhub1.tfmmobile.domain.model.usecase

import com.teamhub1.tfmmobile.domain.model.user.UserRepository
import javax.inject.Inject

class SignUpUseCase @Inject constructor(private val userRepository: UserRepository) {

    suspend operator fun invoke(userName: String, firstName: String, lastName: String, email: String, password: String) =
        userRepository.signUp(userName, firstName, lastName, email, password)
}