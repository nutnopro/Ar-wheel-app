import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsOptional, IsNotEmpty, IsBoolean, IsNumber } from "class-validator";

export class AddressDto {
    @ApiProperty({ description: 'House number or building name', example: '123' })
    @IsOptional()
    @IsString()
    houseNumber?: string = '';

    @ApiProperty({ description: 'Street name', example: 'Main Street' })
    @IsOptional()
    @IsString()
    street?: string = '';

    @ApiProperty({ description: 'Sub-district or locality', example: 'Pak Nakhon' })
    @IsOptional()
    @IsString()
    subDistrict?: string = '';

    @ApiProperty({ description: 'District or administrative division', example: 'Muang Nakhon Si Thammarat' })
    @IsOptional()
    @IsString()
    district?: string = '';

    @ApiProperty({ description: 'City name', example: 'Nakhon Si Thammarat' })
    @IsOptional()
    @IsString()
    city?: string = '';

    @ApiProperty({ description: 'State, province, or region', example: 'Nakhon Si Thammarat' })
    @IsOptional()
    @IsString()
    stateOrProvince?: string = '';

    @ApiProperty({ description: 'Country name', example: 'Thailand' })
    @IsOptional()
    @IsString()
    country?: string = '';

    @ApiProperty({ description: 'Postal or ZIP code', example: '80000' })
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Postal code cannot be empty' })
    postalCode?: string = '';
}

export class NotificationPreferencesDto {
    @ApiProperty({ description: 'Email notification enabled', example: true })
    @IsOptional()
    @IsBoolean()
    email: boolean = true;

    @ApiProperty({ description: 'Push notification enabled', example: true })
    @IsOptional()
    @IsBoolean()
    push: boolean = true;
}

export class ArPreferencesDto {
    @ApiProperty({ description: 'Show AR help tips', example: true })
    @IsOptional()
    @IsBoolean()
    showHelpTips: boolean = true;

    @ApiProperty({ description: 'Default wheel size for AR preview', example: 18 })
    @IsOptional()
    @IsNumber()
    defaultWheelSize: number = 18;
}

export class UserSettingsDto {
    @ApiProperty({ description: 'Language (en | th)', example: 'en' })
    @IsOptional()
    @IsString()
    language?: string = 'en';

    @ApiProperty({ description: 'Theme (light | dark)', example: 'light' })
    @IsOptional()
    @IsString()
    theme?: string = 'light';

    @ApiProperty({ description: 'Notification preferences', type: () => NotificationPreferencesDto })
    @IsOptional()
    @Type(() => NotificationPreferencesDto)
    notificationPreferences?: NotificationPreferencesDto;

    @ApiProperty({ description: 'AR-specific preferences', type: () => ArPreferencesDto })
    @IsOptional()
    @Type(() => ArPreferencesDto)
    arPreferences?: ArPreferencesDto;
}
