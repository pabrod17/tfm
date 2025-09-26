package com.teamhub1.tfmmobile.data.provider.network

import com.teamhub1.tfmmobile.data.provider.network.dto.ChangePasswordDto
import com.teamhub1.tfmmobile.data.provider.network.dto.LoginDto
import com.teamhub1.tfmmobile.data.provider.network.dto.SignUpDto
import com.teamhub1.tfmmobile.data.provider.network.dto.UserDto
import com.teamhub1.tfmmobile.data.provider.network.response.LoginResponse
import com.teamhub1.tfmmobile.data.provider.network.response.UserResponse
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

interface UserApiService {

    @POST("users/login")
    suspend fun login(@Body loginDto: LoginDto): LoginResponse

    @POST("users/signUp")
    suspend fun signUp(@Body signUpDto: SignUpDto): LoginResponse

    @PUT("users/{id}")
    suspend fun updateProfile(@Path("id") id:Long,
                              @Body userDto: UserDto
    ): UserResponse

    @POST("users/{id}/changePassword")
    suspend fun changePassword(@Path("id") id:Long,
                              @Body changePasswordDto: ChangePasswordDto)
}