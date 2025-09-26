package com.teamhub1.tfmmobile.data.provider.network

import com.teamhub1.tfmmobile.data.core.interceptors.AuthInterceptor
import com.teamhub1.tfmmobile.data.provider.EventRepositoryImpl
import com.teamhub1.tfmmobile.data.provider.ExerciseRepositoryImpl
import com.teamhub1.tfmmobile.data.provider.GameRepositoryImpl
import com.teamhub1.tfmmobile.data.provider.LesionRepositoryImpl
import com.teamhub1.tfmmobile.data.provider.PlayRepositoryImpl
import com.teamhub1.tfmmobile.data.provider.PlayerRepositoryImpl
import com.teamhub1.tfmmobile.data.provider.RepositoryImpl
import com.teamhub1.tfmmobile.data.provider.SeasonRepositoryImpl
import com.teamhub1.tfmmobile.data.provider.StretchingRepositoryImpl
import com.teamhub1.tfmmobile.data.provider.TrainingRepositoryImpl
import com.teamhub1.tfmmobile.data.provider.UserRepositoryImpl
import com.teamhub1.tfmmobile.domain.model.Repository
import com.teamhub1.tfmmobile.domain.model.event.EventRepository
import com.teamhub1.tfmmobile.domain.model.exercise.ExerciseRepository
import com.teamhub1.tfmmobile.domain.model.game.GameRepository
import com.teamhub1.tfmmobile.domain.model.lesion.LesionRepository
import com.teamhub1.tfmmobile.domain.model.play.PlayRepository
import com.teamhub1.tfmmobile.domain.model.player.PlayerRepository
import com.teamhub1.tfmmobile.domain.model.season.SeasonRepository
import com.teamhub1.tfmmobile.domain.model.stretching.StretchingRepository
import com.teamhub1.tfmmobile.domain.model.training.TrainingRepository
import com.teamhub1.tfmmobile.domain.model.user.UserRepository
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
//            .baseUrl("http://10.0.2.2:8080/")
//            Esta es la ip del wifi. Para poder conectarme desde un dispositivo fisico movil
//            .baseUrl("http://192.168.1.50:8080/")
//            .baseUrl("http://192.168.175.69:8080/")
//            .baseUrl("http://teamhub-basket-aws-env.eu-north-1.elasticbeanstalk.com/")
            .baseUrl("https://api.teamhubbasket.com/")


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