package com.example.tfmmobile.data.provider.network

import TokenManager
import com.example.tfmmobile.data.core.interceptors.AuthInterceptor
import com.example.tfmmobile.data.core.interceptors.TokenManage3
import com.example.tfmmobile.data.provider.EventRepositoryImpl
import com.example.tfmmobile.data.provider.ExerciseRepositoryImpl
import com.example.tfmmobile.data.provider.GameRepositoryImpl
import com.example.tfmmobile.data.provider.LesionRepositoryImpl
import com.example.tfmmobile.data.provider.PlayRepositoryImpl
import com.example.tfmmobile.data.provider.PlayerRepositoryImpl
import com.example.tfmmobile.data.provider.RepositoryImpl
import com.example.tfmmobile.data.provider.SeasonRepositoryImpl
import com.example.tfmmobile.data.provider.StretchingRepositoryImpl
import com.example.tfmmobile.data.provider.TrainingRepositoryImpl
import com.example.tfmmobile.data.provider.UserRepositoryImpl
import com.example.tfmmobile.domain.model.Repository
import com.example.tfmmobile.domain.model.event.EventRepository
import com.example.tfmmobile.domain.model.exercise.ExerciseRepository
import com.example.tfmmobile.domain.model.game.GameRepository
import com.example.tfmmobile.domain.model.lesion.LesionRepository
import com.example.tfmmobile.domain.model.play.PlayRepository
import com.example.tfmmobile.domain.model.player.PlayerRepository
import com.example.tfmmobile.domain.model.season.SeasonRepository
import com.example.tfmmobile.domain.model.stretching.StretchingRepository
import com.example.tfmmobile.domain.model.training.TrainingRepository
import com.example.tfmmobile.domain.model.user.UserRepository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Singleton


@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {

    val httpClient = OkHttpClient.Builder()
        .addInterceptor(Interceptor { chain ->
            val originalRequest = chain.request()
            val userId = 1 // El userId que deseas pasar como RequestAttribute
            val newRequest = originalRequest.newBuilder()
                .header("userId", userId.toString())
                .build()
            chain.proceed(newRequest)
        })
        .build()
    val httpClient1 = OkHttpClient.Builder()
        .addInterceptor(object : Interceptor {
            override fun intercept(chain: Interceptor.Chain): okhttp3.Response {
                val request = chain.request()
                println("URL: $request")
                return chain.proceed(request)
            }
        })
        .build()

    @Provides
    @Singleton
    fun provideRetrofit(okHttpClient: OkHttpClient):Retrofit{

        return Retrofit
            .Builder()
            .client(okHttpClient)
            .baseUrl("http://10.0.2.2:8080/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }
    @Provides
    @Singleton
    fun provideOkHttpClient(authInterceptor: AuthInterceptor):OkHttpClient{
        val interceptor = HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY)
        return OkHttpClient
            .Builder()
            .addInterceptor(authInterceptor)
            .build()
    }



    @Provides
    fun provideTeamApiService(retrofit: Retrofit): TeamApiService{
        return retrofit.create(TeamApiService::class.java)
    }

    @Provides
    fun provideRepository(apiService: TeamApiService):Repository{
        return RepositoryImpl(apiService)
    }

    @Provides
    fun provideUserApiService(retrofit: Retrofit): UserApiService{
        return retrofit.create(UserApiService::class.java)
    }

    @Provides
    fun provideUserRepository(apiService: UserApiService): UserRepository {
        return UserRepositoryImpl(apiService)
    }

    @Provides
    fun providePlayerApiService(retrofit: Retrofit): PlayerApiService{
        return retrofit.create(PlayerApiService::class.java)
    }

    @Provides
    fun providePlayerRepository(apiService: PlayerApiService): PlayerRepository {
        return PlayerRepositoryImpl(apiService)
    }

    @Provides
    fun provideSeasonApiService(retrofit: Retrofit): SeasonApiService{
        return retrofit.create(SeasonApiService::class.java)
    }

    @Provides
    fun provideSeasonRepository(apiService: SeasonApiService): SeasonRepository {
        return SeasonRepositoryImpl(apiService)
    }

    @Provides
    fun provideGameApiService(retrofit: Retrofit): GameApiService{
        return retrofit.create(GameApiService::class.java)
    }

    @Provides
    fun provideGameRepository(apiService: GameApiService): GameRepository {
        return GameRepositoryImpl(apiService)
    }

    @Provides
    fun provideTrainingApiService(retrofit: Retrofit): TrainingApiService{
        return retrofit.create(TrainingApiService::class.java)
    }

    @Provides
    fun provideTrainingRepository(apiService: TrainingApiService): TrainingRepository {
        return TrainingRepositoryImpl(apiService)
    }

    @Provides
    fun provideLesionApiService(retrofit: Retrofit): LesionApiService{
        return retrofit.create(LesionApiService::class.java)
    }

    @Provides
    fun provideLesionRepository(apiService: LesionApiService): LesionRepository {
        return LesionRepositoryImpl(apiService)
    }

    @Provides
    fun provideExerciseApiService(retrofit: Retrofit): ExerciseApiService{
        return retrofit.create(ExerciseApiService::class.java)
    }

    @Provides
    fun provideExerciseRepository(apiService: ExerciseApiService): ExerciseRepository {
        return ExerciseRepositoryImpl(apiService)
    }

    @Provides
    fun provideStretchingApiService(retrofit: Retrofit): StretchingApiService{
        return retrofit.create(StretchingApiService::class.java)
    }

    @Provides
    fun provideStretchingRepository(apiService: StretchingApiService): StretchingRepository {
        return StretchingRepositoryImpl(apiService)
    }

    @Provides
    fun providePlayApiService(retrofit: Retrofit): PlayApiService{
        return retrofit.create(PlayApiService::class.java)
    }
    @Provides
    fun providePlayRepository(apiService: PlayApiService): PlayRepository {
        return PlayRepositoryImpl(apiService)
    }

    @Provides
    fun provideEventApiService(retrofit: Retrofit): EventApiService{
        return retrofit.create(EventApiService::class.java)
    }
    @Provides
    fun provideEventRepository(apiService: EventApiService): EventRepository {
        return EventRepositoryImpl(apiService)
    }

}