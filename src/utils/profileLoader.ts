import type { ProfileDetailResponse, FullUserProfile } from "@/types";
import { PLATFORMS, extractProfiles } from "./dataHelpers";

const REAL_BIOS: Record<string, string> = {
  // Instagram
  "instagram": "Instagram's official account, featuring the best and most creative content from across the global Instagram community.",
  "cristiano": "Cristiano Ronaldo is a Portuguese professional footballer widely regarded as one of the greatest players of all time.",
  "leomessi": "Lionel Messi is an Argentine professional footballer and World Cup champion, widely considered one of the greatest players ever.",
  "selenagomez": "Selena Gomez is an American singer, actress, and founder of Rare Beauty, known for her music and advocacy for mental health.",
  "kyliejenner": "Kylie Jenner is an American media personality, socialite, and businesswoman, founder of Kylie Cosmetics.",
  "therock": "Dwayne 'The Rock' Johnson is an American actor, businessman, and former professional wrestler.",
  "arianagrande": "Ariana Grande is a Grammy Award-winning American singer, songwriter, and actress known for her incredible vocal range.",
  "kimkardashian": "Kim Kardashian is an American media personality, socialite, businesswoman, and founder of SKIMS and SKKN.",
  "beyonce": "Beyoncé is a record-breaking American singer, songwriter, and businesswoman, known for her boundary-pushing artistry.",
  "khloekardashian": "Khloé Kardashian is an American media personality and socialite, co-founder of the clothing brand Good American.",
  
  // YouTube
  "MrBeast6000": "Jimmy Donaldson, better known as MrBeast, is an American YouTuber known for his pioneering big-budget stunts and philanthropy.",
  "tseries": "T-Series is India's largest music label and movie studio, and the most-subscribed YouTube channel globally.",
  "checkgate": "Cocomelon creates entertaining and educational 3D animation videos for toddlers and young children.",
  "setindia": "Sony Entertainment Television (SET) India is a 24-hour Hindi entertainment channel offering family-friendly programming.",
  "VladandNiki": "Vlad and Niki is a popular kids' channel featuring the imaginative and playful adventures of two young brothers.",
  "KidsDianaShow": "Kids Diana Show features Diana and her family in fun, educational, and entertaining videos for children worldwide.",
  "LikeNastyaofficial": "Like Nastya features the adventures of Nastya and her family, making it one of the largest children's channels in the world.",
  "zeemusiccompany": "Zee Music Company is one of India's leading television media and entertainment companies, featuring Bollywood music.",
  "PewDiePie": "Felix Kjellberg, known as PewDiePie, is a Swedish YouTuber known for his Let's Play videos and comedic formats.",
  "WWEFanNation": "World Wrestling Entertainment (WWE) features highlights, interviews, and exclusive content from the world of sports entertainment.",
  
  // TikTok
  "khaby.lame": "Khabane Lame is a Senegalese-Italian TikToker known for his silent, deadpan reactions to overly complicated life hack videos.",
  "charlidamelio": "Charli D'Amelio is an American social media personality and dancer who gained massive popularity on TikTok.",
  "mrbeast": "MrBeast on TikTok brings his signature big-budget challenges, philanthropy, and stunts to a short-form audience.",
  "willsmith": "Will Smith is an Academy Award-winning American actor, rapper, and producer sharing behind-the-scenes and comedic content.",
  "bellapoarch": "Bella Poarch is a Filipino-American singer and social media personality known for creating the most liked video on TikTok.",
  "addisonre": "Addison Rae is an American social media personality, dancer, and actress who rose to fame on TikTok.",
  "kimberly.loaiza": "Kimberly Loaiza is a Mexican influencer and singer, one of the most followed Spanish-speaking creators on TikTok.",
  "tiktok": "TikTok's official account highlighting the latest trends, creators, and viral moments on the platform.",
  "zachking": "Zach King is an American filmmaker and illusionist known for his 'magic vines' and digital sleight of hand.",
  "domelipa": "Domelipa is a prominent Mexican TikTok creator known for her lip-syncs, dance videos, and lifestyle content."
};

const profileModules = import.meta.glob<ProfileDetailResponse>(
  "../assets/data/profiles/*.json"
);

export async function loadProfileByUsername(
  username: string
): Promise<ProfileDetailResponse | null> {
  const path = `../assets/data/profiles/${username}.json`;
  const loader = profileModules[path];

  if (loader) {
    const result = await loader();
    const data =
      (result as { default?: ProfileDetailResponse }).default ?? result;
    return data as ProfileDetailResponse;
  }

  // Fallback: Generate mock detail profile from search summary data
  for (const platform of PLATFORMS) {
    const profiles = extractProfiles(platform);
    const found = profiles.find(
      (p) =>
        p.username === username ||
        p.handle === username ||
        p.custom_name === username ||
        p.user_id === username
    );

    if (found) {
      const fallbackDesc = `A popular creator making amazing content on ${platform}.`;
      const routeId = found.username || found.handle || found.custom_name || found.user_id || "";
      const description = REAL_BIOS[routeId] || fallbackDesc;

      const fakeDetail: ProfileDetailResponse = {
        data: {
          success: true,
          user_profile: {
            ...found,
            is_verified: found.is_verified || false,
            description: description,
            posts_count: Math.floor(Math.random() * 500) + 50,
            avg_likes: Math.floor((found.engagements || 0) * 0.9) || 0,
            avg_comments: Math.floor((found.engagements || 0) * 0.1) || 0,
          } as FullUserProfile,
        },
      };
      return fakeDetail;
    }
  }

  return null;
}
