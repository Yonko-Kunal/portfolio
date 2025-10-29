interface Skill {
    name: string;
    href: string;
    component: string;
}

interface TemplatePart {
    type: 'text' | 'skill' | 'bold';
    key: string;
    text?: string;
    skill?: Skill;
}

export function parseTemplate(template: string, skills: Skill[]): TemplatePart[] {
    const parts: TemplatePart[] = [];

    let partKey = 0;

    // Replace skill placeholders first
    let processedTemplate = template;
    const skillRegex = /\{skills:(\d+)\}/g;
    let match;

    while ((match = skillRegex.exec(template)) !== null) {
        const skillIndex = parseInt(match[1]);
        if (skills[skillIndex]) {
            processedTemplate = processedTemplate.replace(
                match[0],
                `__SKILL_${skillIndex}__`
            );
        }
    }

    // Split by bold markers and skill placeholders
    const tokens = processedTemplate.split(/(<b>.*?<\/b>|__SKILL_\d+__)/);

    tokens.forEach((token: string) => {
        if (token.startsWith('<b>') && token.endsWith('</b>')) {
            // Bold text
            const text = token.replace(/<\/?b>/g, '');
            parts.push({
                type: 'bold',
                key: `bold-${partKey++}`,
                text,
            });
        } else if (token.startsWith('__SKILL_') && token.endsWith('__')) {
            // Skill placeholder
            const skillIndex = parseInt(token.replace(/__SKILL_(\d+)__/, '$1'));
            if (skills[skillIndex]) {
                parts.push({
                    type: 'skill',
                    key: `skill-${partKey++}`,
                    skill: skills[skillIndex],
                });
            }
        } else if (token.trim()) {
            // Regular text
            parts.push({
                type: 'text',
                key: `text-${partKey++}`,
                text: token,
            });
        }
    });

    return parts;
}